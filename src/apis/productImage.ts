import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import { queryParams } from '../types/common';
import { createProductImage, updateProductImage } from '../types/productImage';

const getAll = (params?: queryParams) => {
  return instance.get(`${URL_API}/productImage/getAll`, {
    params,
  });
};

const getById = (id: string) => {
  return instance.get(`${URL_API}/productImage/getById/${id}`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createProductImage
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/productImage/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: updateProductImage
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/productImage/update/${data.id}`,
    data
  );
};

const deleteProductImage = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `${URL_API}/productImage/delete/${id}`
  );
};

export const productImageApi = {
  create,
  getAll,
  getById,
  update,
  deleteProductImage,
};