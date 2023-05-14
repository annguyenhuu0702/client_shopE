import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { queryParams } from '../types/common';
import {
  ICreateVariantValue,
  IGetAllVariantValue,
  IUpdateVariantValue,
} from '../types/variantValue';

const getAll = (params?: IGetAllVariantValue) => {
  return instance.get(`variantValue/getAll`, {
    params,
  });
};

const getAllColor = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`variantValue/getAllColor`, {
    params,
  });
};

const getAllSize = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`variantValue/getAllSize`, {
    params,
  });
};

const createVariantValue = (
  token: string | null,
  dispatch: AppDispatch,
  data: ICreateVariantValue
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(`variantValue/create`, data);
};

const updateVariantValue = (
  token: string | null,
  dispatch: AppDispatch,
  data: IUpdateVariantValue
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `variantValue/update/${data.id}`,
    data
  );
};

const deleteVariantValue = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `variantValue/delete/${id}`
  );
};

export const variantValueApi = {
  getAll,
  getAllColor,
  getAllSize,
  createVariantValue,
  updateVariantValue,
  deleteVariantValue,
};
