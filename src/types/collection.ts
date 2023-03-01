import React from 'react';
import { category } from './category';
import { queryParams, tokenPayload } from './common';
import { productCategory } from './productCategory';

export interface collection {
  key?: React.Key | string | number;
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  categoryId: number;
  productCategories: productCategory[];
  category: category;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
}

export interface createCollection {
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  categoryId: number;
  resetValues?: Function;
}

export interface updateCollection extends createCollection {
  id: number;
}

export interface deleteCollection extends tokenPayload {
  id: number;
  params?: queryParams;
}

export interface getAllCollectionParams extends queryParams {
  productCategories?: boolean;
  name?: string;
  slug?: string;
}
