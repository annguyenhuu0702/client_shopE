import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import {
  createProductImage,
  getAllProductImageParams,
  updateProductImage,
} from '../types/productImage';

const getAll = (params?: getAllProductImageParams) => {
  return instance.get(`productImage/getAll`, {
    params,
  });
};

const getById = (id: string) => {
  return instance.get(`productImage/getById/${id}`);
};

const createMany = (
  token: string | null,
  dispatch: AppDispatch,
  data: createProductImage
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `productImage/createMany`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: updateProductImage
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `productImage/update/${data.id}`,
    data
  );
};

const deleteProductImage = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `productImage/delete/${id}`
  );
};

export const productImageApi = {
  getAll,
  getById,
  update,
  deleteProductImage,
  createMany,
};
