import React from 'react';
import { categoryType } from './categortType';
import { QueryParams } from './common';

export interface category {
  id: number | string;
  name: string;
  slug: string;
  title: string;
  categoryTypeId: number | null;
  categoryType?: categoryType;
  parent_id: number | null;
  parent?: category;
  children: category[];
  productCategories?: any;
  key?: React.Key | string | number;
  createdAt: string;
  updatedAt: string;
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

export interface getAllCategoryParams extends QueryParams {
  name?: string;
}
