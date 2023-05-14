import React from 'react';
import { ICollection } from './collection';
import { queryParams } from './common';

export interface ICategory {
  key?: React.Key | string | number;
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  collections: ICollection[];
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
  resetValues?: Function;
}

export interface ICreateCategory {
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  resetValues?: Function;
}

export interface IUpdateCategory extends ICreateCategory {
  id: number;
}

export interface IGetAllCategoryParams extends queryParams {
  collections?: boolean;
  name?: string;
  slug?: string;
}
