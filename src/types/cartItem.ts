import { tokenPayload } from './common';
import { IProductVariant } from './productVariant';

type CartItem = {
  key?: React.Key | string | number;
  id: number;
  cartId: number;
  productVariantId: number;
  productVariant: IProductVariant;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

type createCartItem = {
  productVariantId: number;
  quantity: number;
};
type updateCartItem = {
  id: number;
  quantity: number;
};

type deleteCartItem = tokenPayload & {
  id: number;
};

export type { CartItem, createCartItem, updateCartItem, deleteCartItem };
