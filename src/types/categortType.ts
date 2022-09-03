import { category } from './category';
import { queryParams } from './common';

export interface categoryType {
  id: string | number;
  name: string;
  categories: category[];
  key?: React.Key | string | number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  resetValues?: Function;
}

export interface getAllCategoryTypeParams extends queryParams {
  name?: string;
}

export interface createCategoryType {
  name: string;
  resetValues?: Function;
}

export interface updateCategoryType extends createCategoryType {
  id?: string | number;
}
