import { Payment } from './payment';
import { IProductVariant } from './productVariant';

type PaymentItem = {
  key: string | number | React.Key;
  id: number;
  paymentId: number;
  productVariantId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  payment: Payment;
  productVariant: IProductVariant;
};

export type { PaymentItem };
