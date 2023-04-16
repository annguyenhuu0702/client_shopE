import { queryParams, tokenPayload } from './common';

export interface IVariantValue {
  id: number;
  name: string;
  variantId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  resetValues?: Function;
}

export interface ICreateVariantValue {
  name: string;
  variantId: number;
  resetValues?: Function;
}

export interface IUpdateVariantValue extends ICreateVariantValue {
  id: number;
}

export interface IGetAllVariantValue extends queryParams {
  variantName?: string;
}

export interface IGetAllColor extends tokenPayload {
  params?: queryParams;
}

export interface IGetAllSize extends tokenPayload {
  params?: queryParams;
}
