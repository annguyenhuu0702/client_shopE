import React from 'react';
import { queryParams } from './common';

export interface IProductImage {
  key: React.Key | number | string;
  id: number;
  productId: number;
  variantValueId: number;
  path: string;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProductImage {
  productId: number;
  pathImgs: Array<{
    variantValueId: number;
    path: string;
  }>;
  listId: number[];
  thumbnail: string;
  updateImages: IProductImage[];
}

export interface IGetAllProductImageParams extends queryParams {
  productId?: string;
}
