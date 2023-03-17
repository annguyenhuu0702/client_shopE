import React from 'react';
import { ICollection } from './collection';
import { queryParams } from './common';

export interface IProductCategory {
  key?: React.Key | string | number;
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  collectionId: number;
  collection: ICollection;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
}

export interface ICreateProductCategory {
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  collectionId: number;
  resetValues?: Function;
}

export interface IUpdateProductCategory extends ICreateProductCategory {
  id: number;
}

export interface IGetAllProductCategoryParams extends queryParams {
  collection?: boolean;
  slug?: string;
  name?: string;
}
