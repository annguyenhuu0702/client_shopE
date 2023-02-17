import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import { createCollection, updateCollection } from '../types/collection';
import { queryParams } from '../types/common';

const getAll = (params?: queryParams) => {
  return instance.get(`${URL_API}/collection/getAll`, {
    params,
  });
};

const getById = (id: string) => {
  return instance.get(`${URL_API}/collection/getById/${id}`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createCollection
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/collection/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: updateCollection
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/collection/update/${data.id}`,
    data
  );
};

const deleteCollection = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `${URL_API}/collection/delete/${id}`
  );
};

export const collectionApi = {
  create,
  getAll,
  getById,
  update,
  deleteCollection,
};
