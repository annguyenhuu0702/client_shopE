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
  resetValues?: Function;
}

export interface ICreateProductVariant {
  productId: number;
  name: string;
  inventory: number;
  variantValues: IVariantValue[];
  resetValues?: Function;
}

export interface IUpdateProductVariant extends ICreateProductVariant {
  id: number;
}

export interface IGetAllProductProductVariantParams extends queryParams {
  name?: string;
}
