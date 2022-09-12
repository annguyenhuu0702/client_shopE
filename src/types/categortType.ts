import { category } from './category';
import { queryParams, tokenPayload } from './common';

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

export interface createCategoryType {
  name: string;
  resetValues?: Function;
}

export interface updateCategoryType extends createCategoryType {
  id?: string | number;
}

export interface deleteCategoryType extends tokenPayload {
  id: number;
  params?: queryParams;
}

export interface getAllCategoryTypeParams extends queryParams {
  name?: string;
}
