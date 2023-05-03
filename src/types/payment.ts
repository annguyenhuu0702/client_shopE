import { queryParams, tokenPayload } from './common';
import { IUser } from './user';

type createPayment = {
  fullname: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  payment: number;
  point: number;
  shippingCost: number;
  totalPrice: number;
};

type Payment = {
  key: number;
  id: number;
  fullname: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  payment: number;
  status: string;
  userId: number;
  point: number;
  shippingCost: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  paymentItems: PaymentItem[];
};

type getAllPaymentParams = queryParams & {};

type getAllPayment = tokenPayload & {
  params?: getAllPaymentParams;
};

export type { createPayment, Payment, getAllPayment };
