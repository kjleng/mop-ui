import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import merge from 'lodash/merge';

import { config } from '../utils/config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config().API_HOST,
  responseType: 'json',
  headers: {
    'content-type': 'application/json',
  },
});

const handleSuccessRequest = async (req: AxiosRequestConfig) => {
  const { defaults } = axiosInstance;

  merge(req.params, defaults.params);

  return req;
};

const handleSuccessResponse = async (response: any) => response;

const handleError = async (err: any) => {
  if (axios.isCancel(err)) {
    throw err;
  }

  if (err.message === 'Network Error') {
    return Promise.reject('Network Error');
  }

  return Promise.reject(err?.response);
};

axiosInstance.interceptors.request.use(handleSuccessRequest, handleError);
axiosInstance.interceptors.response.use(handleSuccessResponse, handleError);

export interface HttpRequestConfig extends AxiosRequestConfig {}
export interface HttpRequestError<T = any> extends AxiosError<T> {}
export interface HttpRequestResponse<T = any> extends AxiosResponse<T> {}

export const CancelToken = axios.CancelToken;
export const httpRequest = axiosInstance;
