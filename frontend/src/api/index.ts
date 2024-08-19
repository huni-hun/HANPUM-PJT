import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}`,
});

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem('accesstoken');

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

export default api;
