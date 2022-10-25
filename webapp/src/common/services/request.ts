import { URL_API } from '@/common/index';
import axios from 'axios';
import Cookies from 'js-cookie';

const URL = `${URL_API}/api`;
const request = axios.create({
  baseURL: URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Change request data/error here
request.interceptors.request.use(
  async (config) => {
    // const token = Cookies.get('AUTH_TOKEN');
    const token = localStorage.getItem('accessToken')
    // console.log("🚀 ~ file: request.ts ~ line 20 ~ token", token)
    
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
