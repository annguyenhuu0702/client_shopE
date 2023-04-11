import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { queryParams } from '../types/common';
import { createDiscount } from '../types/discount';

const getAll = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
) => {
  return apiCallerWithToken(token, dispatch).get(`discount/getAll`, {
    params,
  });
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createDiscount
) => {
  return apiCallerWithToken(token, dispatch).post(`discount/create`, data);
};

const deleteDiscount = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
) => {
  return apiCallerWithToken(token, dispatch).delete(`discount/delete/${id}`);
};

export const discountApi = {
  getAll,
  create,
  deleteDiscount,
};
