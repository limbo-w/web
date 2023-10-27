import Axios from 'axios';
import message from '../../components/Message';
import { isDev } from '../../utils';
export const commonRequest = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    timeout: 8000,
    withCredentials: !isDev(),
});

commonRequest.interceptors.request.use(
  config => {
    if ('localStorage' in global) {
      const token = localStorage.getItem('token');
      if (token &&  config.url.indexOf('auth') === -1) { //判断token是否存在
        config.headers.Authorization = `Bearer ${token}`;  //将token设置成请求头
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

commonRequest.interceptors.response.use(function (response) {
    return response;
}, function (error) {
  if ('document' in global) {
    message.error({content: error?.response?.data?.message[0]})
  }
  return Promise.reject(error);
});