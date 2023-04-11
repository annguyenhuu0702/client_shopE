import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { createNews } from '../types/news';

const getAll = (token: string, dispatch: AppDispatch) => {
  return apiCallerWithToken(token, dispatch).get(`news/getAll`);
};

const create = (token: string, dispatch: AppDispatch, data: createNews) => {
  return apiCallerWithToken(token, dispatch).post('/news/create', data);
};

export const newsApi = {
  getAll,
  create,
};
