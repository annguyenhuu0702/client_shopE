import { AxiosResponse } from 'axios';
import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { createPayment } from '../types/payment';

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createPayment
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post('/payment/create', data);
};

export const paymentApi = {
  create,
};
