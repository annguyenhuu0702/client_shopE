import React from 'react';
import { categoryType } from './categortType';
import { QueryParams } from './common';

export interface category {
  id: number | string;
  name: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  isDeleted: boolean;
  categoryTypeId: number | null;
  categoryType: categoryType;
  parentId: number | null;
  parent: category;
  children: category[];
  productCategories?: any;
  key?: React.Key | string | number;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
}

export interface createCategory {
  thumbnail?: string;
  slug: string;
  title: string;
  name: string;
  description: string;
  categoryTypeId: number;
  parentId?: number | null;
  resetValues?: Function;
}

export interface updateCategory extends createCategory {
  id: string | number;
}

export interface getAllCategoryParams extends QueryParams {
  name?: string;
}
