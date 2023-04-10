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

const initialState: cartState = {
  cart: null,
  isLoading: false,
  isError: false,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    getByUser: (state, action: PayloadAction<tokenPayload>) => {
      state.isLoading = true;
      state.isError = false;
    },
    getByUserSuccess: (state, action: PayloadAction<Cart>) => {
      state.isLoading = false;
      state.isError = false;
      state.cart = action.payload;
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
      action: PayloadAction<tokenPayloadData<updateCartItem>>
    ) => {
      state.isLoading = true;
      state.isError = false;
    },
    updateCartSuccess: (state, action: PayloadAction<CartItem>) => {
      state.isLoading = false;
      state.isError = false;
      if (state.cart) {
        let index = state.cart.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          if (action.payload.quantity === 0) {
            state.cart.cartItems.splice(index, 1);
          } else {
            state.cart.cartItems[index].quantity = action.payload.quantity;
          }
        }
      }
    },
    updateCartFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteCart: (state, action: PayloadAction<deleteCartItem>) => {
      state.isLoading = true;
      state.isError = false;
    },
    deleteCartSuccess: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.isError = false;
      if (state.cart) {
        state.cart.cartItems = state.cart.cartItems.filter(
          (item) => item.id !== action.payload
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
