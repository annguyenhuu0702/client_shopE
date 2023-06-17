import { AxiosResponse } from 'axios';
import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { queryParams } from '../types/common';
import { createCoupon } from '../types/coupon';

const getAll = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
) => {
  return apiCallerWithToken(token, dispatch).get(`coupon/getAll`, {
    params,
  });
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createCoupon
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(`coupon/create`, data);
};

export const coupontApi = {
  getAll,
  create,
};
