import React from 'react';
import { queryParams } from './common';
import { IVariantValue } from './variantValue';

export interface IProductVariant {
  key: React.Key | number | string;
  id: number;
  productId: number;
  name: string;
  inventory: number;
  variantValues: IVariantValue[];
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProductVariant {
  productId: number;
  name: string;
  inventory: number;
  variantValues: IVariantValue[];
}

export interface IUpdateProductVariant extends ICreateProductVariant {
  id: number;
}

export interface IGetAllProductVariantParams extends queryParams {
  productId?: number;
}
