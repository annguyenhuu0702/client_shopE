import React from 'react';
import { queryParams } from './common';
import { product } from './product';

export interface productImage {
  key: React.Key | number | string;
  id: number;
  productId: number;
  variantValueId: number;
  path: string;
  // product: product;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
}

export interface createProductImage {
  productId: number;
  pathImgs: Array<{
    variantValueId: number;
    path: string;
  }>;
  listId: number[];
  thumbnail: string;
  updateImages: productImage[];
  resetValues?: Function;
}

export interface updateProductImage extends createProductImage {
  id: number;
}

export interface getAllProductImageParams extends queryParams {
  name?: string;
  productId?: string;
}
