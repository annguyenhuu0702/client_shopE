import { AxiosResponse } from 'axios';
import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { createPayment, updatePayment } from '../types/payment';
import { queryParams } from '../types/common';

const getAll = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get('/payment/getAll', {
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

export const paymentApi = {
  create,
  update,
  getAll,
};
