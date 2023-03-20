import React from 'react';
import { queryParams } from './common';
import { IProductCategory } from './productCategory';
import { IProductImage } from './productImage';
import { IProductVariant } from './productVariant';

export interface IProduct {
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
  productCategory: IProductCategory;
  productImages: IProductImage[];
  productVariants: IProductVariant[];
}

export interface ICreateProduct {
  productCategoryId: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceSale: number;
  resetValues?: Function;
}

export interface IUpdateProduct extends ICreateProduct {
  id: number;
}

export interface IGetAllProductParams extends queryParams {
  name?: string;
  slug?: string;
  otherSlug?: string;
}

export interface IGetAllProductByCategory {
  limitCollection?: number;
  limitProduct?: number;
  slug: string;
}
