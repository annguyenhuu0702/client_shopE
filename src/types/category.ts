import React from 'react';
import { categoryType } from './categortType';
import { queryParams, tokenPayload } from './common';

export interface category {
  id: number | string;
  name: string;
  slug: string;
  title: string;
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
  categoryTypeId: number | null;
  parentId?: number | null;
  resetValues?: Function;
}

export interface updateCategory extends createCategory {
  id: string | number;
}

export interface deleteCategory extends tokenPayload {
  id: number;
  params?: queryParams;
}

export interface getAllCategoryParams extends queryParams {
  name?: string;
}
