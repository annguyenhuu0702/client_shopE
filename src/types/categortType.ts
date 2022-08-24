import { typeCategory } from './category';
import { QueryParams } from './common';

export interface responseCategoryType {
  id?: string | number;
  name: string;
  categories: typeCategory[];
  key?: React.Key | string | number;
  createdAt?: string;
  updatedAt?: string;
  resetValues?: Function;
  isDeleted: boolean;
}

export interface getAllCategoryTypeParams extends QueryParams {
  name?: string;
}

export interface createCategoryType {
  name: string;
  resetValues?: Function;
}
