import { decodeToken, encodeToken } from '@/utils/util';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { GetRefreshToken } from './signup/POST';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isAuthEnticatedAtom } from '@/atoms/isAuthEnticatedAtom';

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

// 토큰 갱신 중 여부
let isRefreshing = false;

// 통신 시 실패한 요청 큐에 저장, 408 에러 발생하면 토큰 재발급, 그 후 순차적으로 요청 다시 실행
// 실패한 요청들 대기열
let failedQueue: FailedRequest[] = [];

// obj인지 판단
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  console.log('queue ::', failedQueue);

  failedQueue = [];
};

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}`,
});

api.interceptors.request.use(
  (config) => {
    // (config: AxiosRequestConfig) => {
    try {
      const localToken = localStorage.getItem('token');
      const sessionToken = sessionStorage.getItem('token');
      console.log('localToken ::', localToken);
      console.log('sessionToken ::', sessionToken);

      if (localToken != null) {
        const tokenObj = decodeToken(JSON.parse(localToken));
        // const tokenObj = localToken;

        console.log(tokenObj);

        if (tokenObj) {
          const { accessToken } = tokenObj;
          config.headers.Authorization = `Bearer ${accessToken}`;
          // config.headers.Authorization = `Bearer ${tokenObj}`;
        }
      } else if (sessionToken != null) {
        const tokenObj = decodeToken(JSON.parse(sessionToken));

        console.log(tokenObj);

        // const tokenObj = sesstionToken;

        if (tokenObj) {
          const { accessToken } = tokenObj;
          config.headers.Authorization = `Bearer ${accessToken}`;
          // config.headers.Authorization = `Bearer ${tokenObj}`;
        }
      }
    } catch (error) {
      console.error('Error parsing token from localStorage:', error);
    }
    // console.log('Request headers:', config.headers);

    // const token =
    //   'eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiQ09NTU9OIiwic3ViIjoiaGFucHVtMiIsImlhdCI6MTcyNTUzNzcyMywiZXhwIjoxNzI1NTM3NzMzfQ.pFf_GNEH9uTIJMzWMpMnPhtKuzg_voRJo7BdRsaAjtE';
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 408 && !originalRequest._retry) {
      toast.error('408: 토큰 만료');
      console.log('408에러 출현');

      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          const { data } = await GetRefreshToken();
          const newToken = data.accessToken;
          console.log('newToken ::', newToken);

          const tokenParts = newToken.split('+');
          const secondPart = tokenParts[1];

          if (!secondPart) {
            console.log('secondPart 없음');
            throw new Error(
              'Invalid token format: second part of token missing',
            );
          }

          // encodeToken 함수 호출
          const encodedTokenObj = encodeToken(secondPart);
          console.log(encodeToken);

          // encodedToken이 undefined일 경우 처리
          if (!encodedTokenObj) {
            console.log('암호화 실패');
            throw new Error('암호화 실패.');
          }

          console.log('암호화한 new Token ::', encodedTokenObj);

          localStorage.setItem('token', JSON.stringify(encodedTokenObj));
          // sessionStorage.setItem('token', JSON.stringify(hashToken));
          api.defaults.headers.common['Authorization'] = `Bearer ${secondPart}`;

          // 큐에 있던 요청들 재시도
          processQueue(null, encodedTokenObj);
          isRefreshing = false;

          // 원래 요청 재시도
          return api(originalRequest);
        } catch (refreshError) {
          // 큐 요청들 실패 처리
          processQueue(refreshError as Error, null);
          isRefreshing = false;
          return Promise.reject(refreshError);
        }

        // }
      } else {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest); // 큐에 있던 요청을 새 토큰으로 재시도
          })
          .catch((err) => Promise.reject(err));
      }
    }

    // 400: 잘못된 요청
    if (error.response?.status === 400) {
      console.error('400: 잘못된 요청');
      return Promise.reject(error);
    }

    // 404: 리소스 없음, 토큰 삭제 및 로그인 페이지 이동
    // if (error.response?.status === 404) {
    //   toast.error('404: 리소스 없음');
    //   console.log('404  떠서 로그인으로 이동')
    //   localStorage.removeItem('token');
    //   sessionStorage.removeItem('token');
    //   window.location.href = '/login'; // 로그인 페이지로 이동
    //   return Promise.reject(error);
    // }

    return Promise.reject(error);
  },
);

export default api;

// 400 잘못된 토큰
// 400에러는 토큰 자체가 잘못된 상황에서 나옵니다.
// 토큰이 손상된 경우, 지원하지 않는 형식에 토큰인 경우, 토큰 시그니처 검증에 실패한 경우

// 404 토큰이 존재하지 않는 경우
// 404는 토큰이 필요한 API에 토큰없이 요청을 보냈을때 나오는 에러이고

// 408 만료된 토큰
