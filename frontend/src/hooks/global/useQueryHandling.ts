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

const useQueryHandling = <TData>(
  key: QueryKey,
  apiFn: QueryFunction<TData>,
  options?: UseQueryOptions<TData, AxiosError>,
) => {
  const navigate = useNavigate();
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
        } else if (response.status === 408) {
          handleTokenExpiration();
        } else if (response.status === 400) {
          localStorage.removeItem('token');
          navigate('/login');
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
