import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { createPayment, updatePayment } from '../types/payment';
import { queryParams } from '../types/common';

const getAllPaymentItem = (
  token: string | null,
  dispatch: AppDispatch
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get('/payment/getAllPaymentItem');
};

const getAll = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get('/payment/getAll', {
    params,
  });
};

const getByUser = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get('/payment/getByUser', {
    params,
  });
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createPayment
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post('/payment/create', data);
};

const createNologin = (data: any): Promise<AxiosResponse> => {
  return instance.post('/payment/create-nologin', data);
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: updatePayment
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `/payment/update/${data.id}`,
    data
  );
};

const deletePayment = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(`/payment/delete/${id}`);
};

const checkPoint = (
  token: string | null,
  dispatch: AppDispatch,
  point: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(`/payment/check-point`, {
    point,
  });
};

const getRevenueMonth = (
  token: string | null,
  dispatch: AppDispatch,
  params?: any
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`/payment/revenue-month`, {
    params,
  });
};

const getRevenueYear = (
  token: string | null,
  dispatch: AppDispatch,
  params?: any
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`/payment/revenue-year`, {
    params,
  });
};

const create_url = (params: any) => {
  return instance.get(`payment/create_url`, {
    params,
  });
};

export const paymentApi = {
  create,
  update,
  getAll,
  getByUser,
  deletePayment,
  checkPoint,
  getRevenueMonth,
  getRevenueYear,
  create_url,
  getAllPaymentItem,
  createNologin,
};
