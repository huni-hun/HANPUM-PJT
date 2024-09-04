import { decodeToken } from '@/utils/util';
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}`,
});

api.interceptors.request.use((config) => {
  try {
    const localToken = localStorage.getItem('token');
    const settionToken = sessionStorage.getItem('token');

    // console.log('localToken ::', localToken);
    // console.log('settionToken ::', settionToken);

    if (localToken != null) {
      const tokenObj = decodeToken(JSON.parse(localToken));

      console.log(tokenObj);

      if (tokenObj) {
        const { accessToken } = tokenObj;
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } else if (settionToken != null) {
      const tokenObj = decodeToken(JSON.parse(settionToken));

      console.log(tokenObj);

      if (tokenObj) {
        const { accessToken } = tokenObj;
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  } catch (error) {
    console.error('Error parsing token from localStorage:', error);
  }
  // console.log('Request headers:', config.headers);
  return config;
});

export default api;
