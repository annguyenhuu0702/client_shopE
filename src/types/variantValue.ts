import { queryParams } from './common';

export interface variantValue {
  id: number;
  name: string;
  variantId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface getAllVariantValue extends queryParams {
  variantName?: string;
}
