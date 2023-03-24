import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../../types/cart';
import { createCartItem, CartItem } from '../../types/cartItem';
import { tokenPayloadData, tokenPayload } from '../../types/common';
import { RootState } from '../store';

export interface cartState {
  cart: Cart | null;
  isLoading: boolean;
  isError: boolean;
}

export interface resCart {}

const initialState: cartState = {
  cart: null,
  isLoading: false,
  isError: false,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    getByUser: (state, actions: PayloadAction<tokenPayload>) => {
      state.isLoading = true;
      state.isError = false;
    },
    getByUserSuccess: (state, actions: PayloadAction<Cart>) => {
      state.isLoading = false;
      state.isError = false;
      state.cart = actions.payload;
    },
    getByUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    addToCart: (
      state,
      actions: PayloadAction<tokenPayloadData<createCartItem>>
    ) => {
      state.isLoading = true;
      state.isError = false;
    },
    addToCartSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    addToCartFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const cartActions = CartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;

export default CartSlice.reducer;
