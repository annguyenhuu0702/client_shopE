import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { createCategory } from '../types/category';
import { QueryParams } from '../types/common';

const getAll = (params?: QueryParams) => {
  return instance.get(`${URL_API}/category/getAll`, {
    params,
  });
};

const create = (token: string | null, dispatch: any, data: createCategory) => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/category/create`,
    data
  );
};

export const categoryApi = {
  create,
  getAll,
};
