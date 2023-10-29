import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL } from './urls';

type DetailMessageType = {
  type: string;
  message: string;
}

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
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
