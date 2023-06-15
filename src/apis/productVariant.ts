import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import {
  ICreateProductVariant,
  IGetAllProductVariantParams,
  IUpdateProductVariant,
  IupdateProductOutStock,
} from '../types/productVariant';

const getAll = (params?: IGetAllProductVariantParams) => {
  return instance.get(`productVariant/getAll`, {
    params,
  });
};

const getAllProductOutStock = (params?: IGetAllProductVariantParams) => {
  return instance.get(`productVariant/getAllProductOutOfStock`, {
    params,
  });
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: ICreateProductVariant[]
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `productVariant/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: IUpdateProductVariant
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(`productVariant/update`, data);
};

const updateInventory = (
  token: string | null,
  dispatch: AppDispatch,
  data: IupdateProductOutStock
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `productVariant/updateInventory/${data.id}`,
    data
  );
};

export const productVariantApi = {
  create,
  getAll,
  update,
  getAllProductOutStock,
  updateInventory,
};
