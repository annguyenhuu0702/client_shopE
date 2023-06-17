import { queryParams, tokenPayload } from './common';

type TCoupon = {
  key: string | number | React.Key;
  id: number;
  name: string;
  startday: Date;
  endday: Date;
  type: string;
  description: string;
  percent: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  resetValues?: Function;
};

type getAllCouponParams = queryParams & {};

type getAllCoupon = tokenPayload & {
  params?: getAllCouponParams;
};

type createCoupon = {
  name: string;
  startday: Date;
  endday: Date;
  type: string;
  description: string;
  percent: number;
  slug: string;
  resetValues?: Function;
};

export type { TCoupon, createCoupon, getAllCoupon };
