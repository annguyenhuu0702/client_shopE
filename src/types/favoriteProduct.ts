import { type } from 'os';
import { IProduct } from './product';

type FavoriteProduct = {
  key: string | number | React.Key;
  id: number;
  productId: number;
  userId: number;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

type createFavoriteProduct = {
  productId: number;
};

export type { FavoriteProduct, createFavoriteProduct };
