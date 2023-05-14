import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import {
  ICreateProductCategory,
  IGetAllProductCategoryParams,
  IUpdateProductCategory,
} from '../types/productCategory';

const getAll = (params?: IGetAllProductCategoryParams) => {
  return instance.get(`productCategory/getAll`, {
    params,
  });
};

const getById = (id: string) => {
  return instance.get(`productCategory/getById/${id}`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: ICreateProductCategory
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `productCategory/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: IUpdateProductCategory
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `productCategory/update/${data.id}`,
    data
  );
};

const deleteProductCategory = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `productCategory/delete/${id}`
  );
};

export const productCategoryApi = {
  create,
  getAll,
  getById,
  update,
  deleteProductCategory,
};
