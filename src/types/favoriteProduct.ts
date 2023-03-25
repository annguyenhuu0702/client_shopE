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

export type { FavoriteProduct };
