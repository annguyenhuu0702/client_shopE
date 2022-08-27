import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { createCategoryType, updateCategoryType } from '../types/categortType';
import { QueryParams } from '../types/common';

const getAll = (params?: QueryParams) => {
  return instance.get(`${URL_API}/category-type/getAll`, {
    params,
  });
};

const create = (
  token: string | null,
  dispatch: any,
  data: createCategoryType
) => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/category-type/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: any,
  data: updateCategoryType
) => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/category-type/update/${data.id}`,
    data
  );
};

const deleteCategoryType = (
  token: string | null,
  dispatch: any,
  id: number
) => {
  return apiCallerWithToken(token, dispatch).delete(
    `${URL_API}/category-type/delete/${id}`
  );
};

export const categoryTypeApi = {
  getAll,
  create,
  update,
  deleteCategoryType,
};
