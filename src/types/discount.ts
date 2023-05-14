import { queryParams, tokenPayload } from './common';
import { IProductCategory } from './productCategory';

type Discount = {
  key: string | number | React.Key;
  id: number;
  name: string;
  productsId: number[];
  productCategories: IProductCategory[];
  startday: Date;
  endday: Date;
  percent: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  resetValues?: Function;
};

type getAllDiscountParams = queryParams & {
  name?: string;
};

type getAllDiscount = tokenPayload & {
  params?: getAllDiscountParams;
};

type createDiscount = {
  name: string;
  productCategoryId: number[];
  startday: Date;
  endday: Date;
  percent: number;
  resetValues?: Function;
};

export type { Discount, getAllDiscount, createDiscount };
