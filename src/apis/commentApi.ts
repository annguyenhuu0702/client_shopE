import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { queryParams } from '../types/common';
import { AppDispatch } from '../redux/store';
import { createComment, updateComment } from '../types/comment';

const getAllComment = (
  token: string | null,
  dispatch: AppDispatch,
  params?: queryParams
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get('/comment/getAll', {
    params,
  });
};

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

const editCommentByUser = (
  token: string | null,
  dispatch: AppDispatch,
  data: updateComment
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `/comment/update/${data.id}`,
    data
  );
};

const deleteComment = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(`/comment/delete/${id}`);
};

export const commentApi = {
  getAllByProduct,
  addCommentByUser,
  editCommentByUser,
  getAllComment,
  deleteComment,
};
