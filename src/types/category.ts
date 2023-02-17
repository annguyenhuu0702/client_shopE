import React from 'react';
import { collection } from './collection';
import { queryParams, tokenPayload } from './common';

export interface category {
  key?: React.Key | string | number;
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  collections: collection;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
}

export interface createCategory {
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  resetValues?: Function;
}

export interface updateCategory extends createCategory {
  id: number;
}

export interface deleteCategory extends tokenPayload {
  id: number;
  params?: queryParams;
}

export interface getAllCategoryParams extends queryParams {
  name?: string;
}
