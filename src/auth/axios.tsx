'use client';

import axios, {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosResponse
} from 'axios';
import { Cookies } from 'react-cookie';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 주소
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== 'undefined') {
      const cookies = new Cookies();
      const accessToken = cookies.get('accessToken');

      if (accessToken) {

        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('Authorization', `Bearer ${accessToken}`);
        } else if (config.headers) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== 'undefined'
    ) {
      originalRequest._retry = true;

      const cookies = new Cookies();
      const refreshToken = cookies.get('refreshToken');

      if (refreshToken) {
        try {
          const res = await axios.post('https://api.com/api/token/refresh/', {
            refresh_token: refreshToken,
          });

          const newAccessToken = res.data.accessToken;
          cookies.set('accessToken', newAccessToken, { path: '/' });

          if (originalRequest.headers && typeof originalRequest.headers.set === 'function') {
            originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
          } else if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          }

          return instance(originalRequest);
        } catch (err) {
          console.error('Token refresh failed:', err);
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
