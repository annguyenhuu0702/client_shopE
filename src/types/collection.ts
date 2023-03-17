import React from 'react';
import { ICategory } from './category';
import { queryParams } from './common';
import { IProductCategory } from './productCategory';

export interface ICollection {
  key?: React.Key | string | number;
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  categoryId: number;
  productCategories: IProductCategory[];
  category: ICategory;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
}

export interface ICreateCollection {
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  categoryId: number;
  resetValues?: Function;
}

export interface IUpdateCollection extends ICreateCollection {
  id: number;
}

export interface IGetAllCollectionParams extends queryParams {
  productCategories?: boolean;
  name?: string;
  slug?: string;
}
