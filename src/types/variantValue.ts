import { queryParams } from './common';

export interface IVariantValue {
  id: number;
  name: string;
  variantId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IGetAllVariantValue extends queryParams {
  variantName?: string;
}
