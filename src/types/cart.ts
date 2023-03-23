import { CartItem } from './cartItem';

type Cart = {
  key: string | number | React.Key;
  id: number;
  userId: number;
  cartItems: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type { Cart };
