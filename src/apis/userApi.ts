import { AxiosResponse } from 'axios';
import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { queryParams } from '../types/common';
import { ICreateUser, IUpdateSuggestion, IUpdateUser } from '../types/user';

const updateSuggestion = (
  token: string | null,
  dispatch: AppDispatch,
  user: IUpdateSuggestion
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `user/updateSuggestion/${user.id}`,
    user
  );
};

const getAll = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`user/getAll`, {
    params,
  });
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  user: ICreateUser
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(`user/create`, user);
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  user: IUpdateUser
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `user/update/${user.id}`,
    user
  );
};

const deleteUser = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(`user/delete/${id}`);
};

export const userApi = {
  getAll,
  create,
  update,
  deleteUser,
  updateSuggestion,
};
