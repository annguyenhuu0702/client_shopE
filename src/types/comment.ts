import { queryParams } from './common';
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

export type { Comment, getCommentByProduct };
