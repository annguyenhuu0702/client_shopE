import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { queryParams } from '../types/common';
import { createNews, updateNews } from '../types/news';

const getAllNewsClient = () => {
  return instance.get(`news/getAll`);
};

const getAll = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`news/getAll`, {
    params,
  });
};

const getById = (
  token: string | null,
  dispatch: AppDispatch,
  id: string
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`/news/getById/${id}`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createNews
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post('/news/create', data);
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: updateNews
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `news/update/${data.id}`,
    data
  );
};

const deleteNews = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(`news/delete/${id}`);
};

export const newsApi = {
  getAll,
  getById,
  create,
  update,
  deleteNews,
  getAllNewsClient,
};
