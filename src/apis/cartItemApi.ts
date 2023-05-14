import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { createCartItem, updateCartItem } from '../types/cartItem';

const addToCart = (
  token: string | null,
  dispatch: AppDispatch,
  data: createCartItem
) => {
  return apiCallerWithToken(token, dispatch).post(`cartItem/create`, data);
};

const updateCart = (
  token: string | null,
  dispatch: AppDispatch,
  data: updateCartItem
) => {
  return apiCallerWithToken(token, dispatch).put(
    `cartItem/update/${data.id}`,
    data
  );
};

const deleteCart = (
  token: string | null,
  dispatch: AppDispatch,
  id: number
) => {
  return apiCallerWithToken(token, dispatch).delete(`cartItem/delete/${id}`);
};

export const cartItemApi = {
  addToCart,
  updateCart,
  deleteCart,
};
