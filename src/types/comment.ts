import { deleteParams, queryParams, tokenPayload } from './common';
import { IUser } from './user';

type Comment = {
  key: string | number | React.Key;
  id: number;
  userId: number;
  content: string;
  productId: number;
  rating: number;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

type getCommentByProduct = {
  productId: number;
  params?: queryParams;
};

type createComment = queryParams & {
  content: string;
  productId: number;
  rating: number;
};

type updateComment = createComment & {
  id: number;
};

type getAllComment = tokenPayload & {
  params?: IGetAllCommentParams;
};

type deleteComment = deleteParams & {
  productId: number;
};

export interface IGetAllCommentParams extends queryParams {
  fullname?: string;
}

export type {
  Comment,
  getCommentByProduct,
  createComment,
  updateComment,
  getAllComment,
  deleteComment,
};
