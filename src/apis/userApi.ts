import { AxiosResponse } from 'axios';
import { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import { queryParams } from '../types/common';
import { ICreateUser, IUpdateUser } from '../types/user';

const getAll = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`${URL_API}/user/getAll`, {
    params,
  });
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  user: ICreateUser
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/user/create`,
    user
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  user: IUpdateUser
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/user/update/${user.id}`,
    user
  );
};

const deleteUser = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `${URL_API}/user/delete/${id}`
  );
};

export const userApi = {
  getAll,
  create,
  update,
  deleteUser,
};
