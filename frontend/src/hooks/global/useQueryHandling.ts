import {
  useQuery,
  QueryFunction,
  QueryKey,
  UseQueryOptions,
} from 'react-query';
import { AxiosError } from 'axios';
import { GetRefreshToken } from '@api/signup/POST';
import { encodeToken, handleTokenExpiration } from '@/utils/util';
import { useNavigate } from 'react-router-dom';
import { isAuthEnticatedAtom } from '@/atoms/isAuthEnticatedAtom';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

const useQueryHandling = <TData>(
  key: QueryKey,
  apiFn: QueryFunction<TData>,
  options?: UseQueryOptions<TData, AxiosError>,
) => {
  const navigate = useNavigate();
  const setAuthEnticate = useSetRecoilState(isAuthEnticatedAtom);
  return useQuery<TData, AxiosError>(key, apiFn, {
    retry: 1,
    // staleTime: 0,
    // cacheTime: 0,
    ...options,
    onError: (error: AxiosError) => {
      // console.log('onError 호출됨');
      const { response } = error;
      // console.log(response);
      if (response) {
        if (response.status === 404) {
          localStorage.removeItem('token');
          navigate('/login');
          setAuthEnticate(false);
          toast.error('문제가 발생했습니다. 로그인을 다시 해주세요.');
        } else if (response.status === 408) {
          handleTokenExpiration();
        } else if (response.status === 400) {
          localStorage.removeItem('token');
          navigate('/login');
          setAuthEnticate(false);
          toast.error('문제가 발생했습니다. 로그인을 다시 해주세요.');
        }
      }

      if (options?.onError) {
        options.onError(error);
      }
    },

    onSuccess: (data) => {
      // console.log('onSuccess 호출됨:', data);
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
  });
};

export default useQueryHandling;
