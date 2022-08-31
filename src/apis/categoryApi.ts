import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import { createCategory, updateCategory } from '../types/category';
import { QueryParams } from '../types/common';

const getAll = (params?: QueryParams) => {
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

export const categoryApi = {
  create,
  getAll,
  update,
};
