import { queryParams, tokenPayload, tokenPayloadData } from './common';

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
  isPaid: boolean;
  userId: number;
  point: number;
  shippingCost: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  paymentItems: PaymentItem[];
  resetValues?: Function;
};

type createPayment = {
  fullname: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  payment: number;
  isPaid?: boolean;
  point: number;
  shippingCost: number;
  totalPrice: number;
  resetValues?: Function;
};

type updatePayment = createPayment & {
  id: number;
  resetValues?: Function;
  params?: queryParams;
};

type getAllPaymentParams = queryParams & {};

type getAllPayment = tokenPayload & {
  params?: getAllPaymentParams;
};

type updatePaymentClient = tokenPayload & {
  data: any;
  params?: queryParams;
};

export type {
  createPayment,
  Payment,
  updatePayment,
  getAllPayment,
  updatePaymentClient,
};
