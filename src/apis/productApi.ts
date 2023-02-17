import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import { queryParams } from '../types/common';
import { createProduct, updateProduct } from '../types/product';

const getAll = (params?: queryParams) => {
  return instance.get(`${URL_API}/product/getAll`, {
    params,
  });
};

const getById = (id: string) => {
  return instance.get(`${URL_API}/product/getById/${id}`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createProduct
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/product/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: updateProduct
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/product/update/${data.id}`,
    data
  );
};

const deleteProduct = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `${URL_API}/product/delete/${id}`
  );
};

export const productApi = {
  create,
  getAll,
  getById,
  update,
  deleteProduct,
};
