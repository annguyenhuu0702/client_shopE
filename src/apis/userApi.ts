import instance from '../config/configAxios';
import { URL_API } from '../constants';
import { QueryParams } from '../types/common';
import { typeCreateUser } from '../types/user';

const getAll = (params?: QueryParams) => {
  return instance.get(`${URL_API}/user/getAll`, { params });
};

const create = (user: typeCreateUser) => {
  return instance.post(`${URL_API}/user/create`, user);
};

export const userApi = {
  getAll,
  create,
};
