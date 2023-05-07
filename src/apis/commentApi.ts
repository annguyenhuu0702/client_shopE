import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { queryParams } from '../types/common';
import { AppDispatch } from '../redux/store';
import { createComment } from '../types/comment';

const getAllByProduct = (
  productId: number,
  params?: queryParams
): Promise<AxiosResponse> => {
  return instance.get(`comment/getByProduct/${productId}`, {
    params,
  });
};

const addCommentByUser = (
  token: string | null,
  dispatch: AppDispatch,
  data: createComment
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post('/comment/create', data);
};

export const commentApi = {
  getAllByProduct,
  addCommentByUser,
};
