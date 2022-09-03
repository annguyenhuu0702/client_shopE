import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import { createCategory, updateCategory } from '../types/category';
import { queryParams } from '../types/common';

const getAll = (params?: queryParams) => {
  return instance.get(`${URL_API}/category/getAll`, {
    params,
  });
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createCategory
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/category/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: updateCategory
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
  update,
  deleteCategory,
};
