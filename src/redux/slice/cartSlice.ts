import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../../types/cart';
import {
  CartItem,
  createCartItem,
  deleteCartItem,
  updateCartItem,
} from '../../types/cartItem';
import { tokenPayload, tokenPayloadData } from '../../types/common';
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
    updateCart: (
      state,
      actions: PayloadAction<tokenPayloadData<updateCartItem>>
    ) => {
      state.isLoading = true;
      state.isError = false;
    },
    updateCartSuccess: (state, actions: PayloadAction<CartItem>) => {
      state.isLoading = false;
      state.isError = false;
      if (state.cart) {
        let index = state.cart.cartItems.findIndex(
          (item) => item.id === actions.payload.id
        );
        if (index !== -1) {
          if (actions.payload.quantity === 0) {
            state.cart.cartItems.splice(index, 1);
          } else {
            state.cart.cartItems[index].quantity = actions.payload.quantity;
          }
        }
      }
    },
    updateCartFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteCart: (state, actions: PayloadAction<deleteCartItem>) => {
      state.isLoading = true;
      state.isError = false;
    },
    deleteCartSuccess: (state, actions: PayloadAction<number>) => {
      state.isLoading = false;
      state.isError = false;
      if (state.cart) {
        state.cart.cartItems = state.cart.cartItems.filter(
          (item) => item.id !== actions.payload
        );
      }
    },
    deleteCartFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const cartActions = CartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;

export default CartSlice.reducer;
