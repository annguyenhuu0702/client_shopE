import { AxiosResponse } from 'axios';
import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { createFavoriteProduct } from '../types/favoriteProduct';

const getFavoriteProductByUser = (
  token: string | null,
  dispatch: AppDispatch
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`favoriteProduct/getByUser`);
};

const create = (
  token: string | null,
  dispatch: AppDispatch,
  data: createFavoriteProduct
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).post(
    `favoriteProduct/create`,
    data
  );
};

const deleteFavoriteProduct = (
  token: string | null,
  dispatch: AppDispatch,
  productId: number
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).delete(
    `favoriteProduct/delete/${productId}`
  );
};

export const favoriteProductApi = {
  getFavoriteProductByUser,
  create,
  deleteFavoriteProduct,
};
