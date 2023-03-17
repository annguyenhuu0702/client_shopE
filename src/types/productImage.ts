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
  resetValues?: Function;
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
  resetValues?: Function;
}

export interface IUpdateProductImage extends ICreateProductImage {
  id: number;
}

export interface IGetAllProductImageParams extends queryParams {
  name?: string;
  productId?: string;
}
