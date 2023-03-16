import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import {
  createProductImage,
  getAllProductImageParams,
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

export const productImageApi = {
  getAll,
  getById,
  createMany,
};
