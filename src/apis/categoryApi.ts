import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import {
  ICreateCategory,
  IGetAllCategoryParams,
  IUpdateCategory,
} from '../types/category';

const getAll = (params?: IGetAllCategoryParams) => {
  return instance.get(`${URL_API}/category/getAll`, {
    params,
  });
};

const getById = (id: string) => {
  return instance.get(`${URL_API}/category/getById/${id}`);
};

const getBySlug = (categorySlug: string) => {
  return instance.get(`${URL_API}/category/getBySlug/${categorySlug}`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: ICreateCategory
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/category/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: IUpdateCategory
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/category/update/${data.id}`,
    data
  );
};

const deleteCategory = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `${URL_API}/category/delete/${id}`
  );
};

export const categoryApi = {
  create,
  getAll,
  getBySlug,
  getById,
  update,
  deleteCategory,
};
