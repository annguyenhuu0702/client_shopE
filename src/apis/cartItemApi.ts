import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import { createCartItem } from '../types/cartItem';

const addToCart = (
  token: string | null,
  dispatch: AppDispatch,
  data: createCartItem
) => {
  return apiCallerWithToken(token, dispatch).post(`cartItem/create`, data);
};

export const cartItemApi = {
  addToCart,
};
