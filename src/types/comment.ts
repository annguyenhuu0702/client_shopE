import { IUser } from './user';

type Comment = {
  key: string | number | React.Key;
  id: number;
  userId: number;
  productId: number;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type { Comment };
