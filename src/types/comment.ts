import { queryParams, tokenPayload } from './common';
import { IUser } from './user';

type Comment = {
  key: string | number | React.Key;
  id: number;
  userId: number;
  content: string;
  productId: number;
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
};

export type { Comment, getCommentByProduct, createComment };
