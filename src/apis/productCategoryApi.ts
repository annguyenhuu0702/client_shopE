import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import {
  ICreateProductCategory,
  IUpdateProductCategory,
  IGetAllProductCategoryParams,
} from '../types/productCategory';

const getAll = (params?: IGetAllProductCategoryParams) => {
  return instance.get(`${URL_API}/productCategory/getAll`, {
    params,
  });
};

const getById = (id: string) => {
  return instance.get(`${URL_API}/productCategory/getById/${id}`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: ICreateProductCategory
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/productCategory/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: IUpdateProductCategory
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/productCategory/update/${data.id}`,
    data
  );
};

const deleteProductCategory = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `${URL_API}/productCategory/delete/${id}`
  );
};

export const productCategoryApi = {
  create,
  getAll,
  getById,
  update,
  deleteProductCategory,
};
