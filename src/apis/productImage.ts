import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import {
  ICreateProductImage,
  IGetAllProductImageParams,
} from '../types/productImage';

const getAll = (params?: IGetAllProductImageParams) => {
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
  data: ICreateProductImage
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
