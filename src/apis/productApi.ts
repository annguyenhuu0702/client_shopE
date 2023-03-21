import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import {
  ICreateProduct,
  IGetAllProductByCategory,
  IGetAllProductParams,
  IUpdateProduct,
} from '../types/product';

const getAll = (params?: IGetAllProductParams) => {
  return instance.get(`product/getAll`, {
    params,
  });
};

const getByCategory = (params: IGetAllProductByCategory) => {
  const { limitProduct, limitCollection, slug } = params;

  return instance.get(`product/category/${slug}`, {
    params: { limitProduct, limitCollection },
  });
};

const getById = (id: string) => {
  return instance.get(`product/getById/${id}`);
};

const getBySlug = (slug: string) => {
  return instance.get(`product/getBySlug/${slug}`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: ICreateProduct
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(`product/create`, data);
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: IUpdateProduct
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `product/update/${data.id}`,
    data
  );
};

const deleteProduct = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(`product/delete/${id}`);
};

export const productApi = {
  create,
  getAll,
  getById,
  getBySlug,
  update,
  deleteProduct,
  getByCategory,
};
