import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiUrl } from './urls';
import { getToken } from '../services/token';

type DetailMessageType = {
  type: string;
  message: string;
}

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiUrl.BASE,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      throw error;
    }
  );

  return api;
};
