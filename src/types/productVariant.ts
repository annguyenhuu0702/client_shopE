import React from 'react';
import { queryParams } from './common';
import { product } from './product';
import { variantValue } from './variantValue';

export interface productVariant {
  key: React.Key | number | string;
  id: number;
  productId: number;
  slug: string;
  inventory: number;
  product: product;
  variantValues: variantValue[];
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
}

export interface createProductVariant {
  productId: number;
  slug: string;
  inventory: number;
  variantValues: variantValue[];
  resetValues?: Function;
}

export interface updateProductVariant extends createProductVariant {
  id: number;
}

export interface getAllProductProductVariantParams extends queryParams {
  name?: string;
}
