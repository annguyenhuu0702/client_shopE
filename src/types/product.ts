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
  code: string;
  slug: string;
  totalStar: number;
  thumbnail: string;
  description: string;
  material: string;
  guide: string;
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
  price: number;
  // priceSale: number;
  description: string;
  material: string;
  guide: string;
  resetValues?: Function;
}

export interface IUpdateProduct extends ICreateProduct {
  id: number;
}

export interface IGetAllProductParams extends queryParams {
  name?: string;
  slug?: string;
  otherSlug?: string;
  min?: string;
  max?: string;
  sizesId?: string;
  colorsId?: string;
}

export interface IGetAllProductByCategory {
  limitCollection?: number;
  limitProduct?: number;
  slug: string;
}

export interface IGetProductBySlug {
  slug: string;
}

export interface ICreateFavoriteProduct {
  productId: number;
}

export interface IGetAllFavoriteProduct extends queryParams {}
