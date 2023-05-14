import React from 'react';
import { queryParams } from './common';
import { IProduct } from './product';
import { IVariantValue } from './variantValue';

export interface IProductVariant {
  key: React.Key | number | string;
  id: number;
  productId: number;
  name: string;
  inventory: number;
  variantValues: IVariantValue[];
  product: IProduct;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProductVariant {
  productId: number;
  name: string;
  inventory: number;
  variantValues: IVariantValue[];
}

export interface IUpdateProductVariant {
  productVariants: ICreateProductVariant[];
  isProductVariants: IProductVariant[];
}

export interface IGetAllProductVariantParams extends queryParams {
  productId?: number;
}
