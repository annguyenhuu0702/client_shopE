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

const getCouponByUser = (token: string | null, dispatch: AppDispatch) => {
  return apiCallerWithToken(token, dispatch).get(`coupon/getCouponByUser`);
};

const checkCoupon = (
  token: string | null,
  dispatch: AppDispatch,
  data: {
    couponId: number;
  }
) => {
  return apiCallerWithToken(token, dispatch).post(`coupon/check-coupon`, data);
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
  getCouponByUser,
  checkCoupon,
};
