import { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { QueryParams } from '../types/common';
import { typeCreateUser, typeUser } from '../types/user';

const getAll = (token: string | null, dispatch: any, params?: QueryParams) => {
  return apiCallerWithToken(token, dispatch).get(`${URL_API}/user/getAll`, {
    params,
  });
};

const create = (token: string | null, dispatch: any, user: typeCreateUser) => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/user/create`,
    user
  );
};

const update = (token: string | null, dispatch: any, user: typeUser) => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/user/update/${user.id}`,
    user
  );
};

export const userApi = {
  getAll,
  create,
  update,
};
