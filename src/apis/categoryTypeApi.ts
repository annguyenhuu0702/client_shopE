import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { createCategoryType } from '../types/categortType';
import { QueryParams } from '../types/common';
import { typeUser } from '../types/user';

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

const update = (token: string | null, dispatch: any, user: typeUser) => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/user/update/${user.id}`,
    user
  );
};

const deleteUser = (token: string | null, dispatch: any, id: number) => {
  return apiCallerWithToken(token, dispatch).delete(
    `${URL_API}/user/delete/${id}`
  );
};

export const categoryTypeApi = {
  getAll,
  create,
  update,
  deleteUser,
};
