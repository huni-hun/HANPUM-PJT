import { decodeToken, encodeToken, handleTokenExpiration } from '@/utils/util';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}`,
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');

      if (token != null) {
        const decodedToken = decodeToken(token);

        if (decodedToken) {
          config.headers.Authorization = `Bearer ${decodedToken}`;
        }
      }
    } catch (error) {}
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 408 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신 후 원래 요청 재시도
        return await handleTokenExpiration(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

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
