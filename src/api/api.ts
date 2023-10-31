import axios, { AxiosInstance, AxiosError } from 'axios';
import { apiUrls } from './urls';

type DetailMessageType = {
  type: string;
  message: string;
}

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: apiUrls.BASE,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      throw error;
    }
  );

  return api;
};
