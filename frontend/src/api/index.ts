import { decodeToken } from '@/utils/util';
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}`,
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenObj = decodeToken(JSON.parse(token));

      // console.log(tokenObj);

      if (tokenObj) {
        const { accessToken } = tokenObj;
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  } catch (error) {
    console.error('Error parsing token from localStorage:', error);
  }

  return config;
});

export default api;
