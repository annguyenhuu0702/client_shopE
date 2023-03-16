import React from 'react';
import { queryParams, tokenPayload } from './common';
import { productCategory } from './productCategory';
import { productImage } from './productImage';
import { productVariant } from './productVariant';

export interface product {
  key?: React.Key | string | number;
  id: number;
  productCategoryId: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  price: number;
  priceSale: number;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
  productCategory: productCategory;
  productImages: productImage[];
  // productVariants: productVariant;
}

export interface createProduct {
  productCategoryId: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  price: number;
  priceSale: number;
  resetValues?: Function;
}

export interface updateProduct extends createProduct {
  id: number;
}

export interface deleteProduct extends tokenPayload {
  id: number;
  params?: queryParams;
}

export interface getAllProductParams extends queryParams {
  name?: string;
  slug?: string;
  otherSlug?: string;
}
