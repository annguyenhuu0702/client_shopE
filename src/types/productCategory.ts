import React from 'react';
import { collection } from './collection';
import { queryParams } from './common';

export interface productCategory {
  key?: React.Key | string | number;
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  // categoryId: number;
  collectionId: number;
  collection: collection;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
}

export interface createProductCategory {
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  // categoryId: number;
  collectionId: number;
  resetValues?: Function;
}

export interface updateProductCategory extends createProductCategory {
  id: number;
}

export interface getAllProductCategoryParams extends queryParams {
  name?: string;
}
