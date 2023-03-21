import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import {
  ICreateCollection,
  IGetAllCollectionParams,
  IUpdateCollection,
} from '../types/collection';

const getAll = (params?: IGetAllCollectionParams) => {
  return instance.get(`collection/getAll`, {
    params,
  });
};

const getById = (id: string) => {
  return instance.get(`collection/getById/${id}`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: ICreateCollection
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(`collection/create`, data);
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: IUpdateCollection
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `collection/update/${data.id}`,
    data
  );
};

const deleteCollection = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(`collection/delete/${id}`);
};

export const collectionApi = {
  create,
  getAll,
  getById,
  update,
  deleteCollection,
};
