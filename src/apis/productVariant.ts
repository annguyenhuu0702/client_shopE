import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import {
  ICreateProductVariant,
  IGetAllProductVariantParams,
  IUpdateProductVariant,
} from '../types/productVariant';

const getAll = (params?: IGetAllProductVariantParams) => {
  return instance.get(`${URL_API}/productVariant/getAll`, {
    params,
  });
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: ICreateProductVariant[]
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `${URL_API}/productVariant/create`,
    data
  );
};

const update = (
  token: string | null,
  dispatch: AppDispatch,
  data: IUpdateProductVariant
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/productVariant/update/${data.id}`,
    data
  );
};

const deleteProductVariant = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `${URL_API}/productVariant/delete/${id}`
  );
};

export const productVariantApi = {
  create,
  getAll,
  update,
  deleteProductVariant,
};
