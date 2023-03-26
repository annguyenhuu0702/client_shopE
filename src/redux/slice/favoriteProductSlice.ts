import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenPayload, tokenPayloadData } from '../../types/common';
import {
  createFavoriteProduct,
  deleteFavoriteProduct,
  FavoriteProduct,
} from '../../types/favoriteProduct';

import { RootState } from '../store';

export interface resProduct {
  rows: FavoriteProduct[];
  count: number;
}

export interface favoriteProductState {
  products: resProduct;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

const initialState: favoriteProductState = {
  products: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 12,
  isLoading: false,
  isError: false,
};

const favoriteProductSlice = createSlice({
  name: 'favoriteProduct',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    getFavoriteProductByUser: (state, actions: PayloadAction<tokenPayload>) => {
      state.isLoading = true;
      state.isError = false;
    },
    getFavoriteProductByUserSuccess: (
      state,
      actions: PayloadAction<resProduct>
    ) => {
      state.isLoading = true;
      state.isError = false;
      state.products.rows = actions.payload.rows;
      state.products.count = actions.payload.count;
    },
    getFavoriteProductByUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createFavoriteProduct: (
      state,
      actions: PayloadAction<tokenPayloadData<createFavoriteProduct>>
    ) => {
      state.isLoading = true;
      state.isError = false;
    },
    createFavoriteProductSuccess: (
      state,
      actions: PayloadAction<FavoriteProduct>
    ) => {
      state.isLoading = true;
      state.isError = false;
      state.products.rows.push(actions.payload);
      state.products.count += 1;
    },
    createFavoriteProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteFavoriteProduct: (
      state,
      actions: PayloadAction<deleteFavoriteProduct>
    ) => {
      state.isLoading = true;
      state.isError = false;
    },
    deleteFavoriteProductSuccess: (state, actions: PayloadAction<number>) => {
      state.isLoading = true;
      state.isError = false;
      state.products.rows = state.products.rows.filter(
        (item) => item.productId !== actions.payload
      );
      state.products.count -= 1;
    },
    deleteFavoriteProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const favoriteProductActions = favoriteProductSlice.actions;
export const favoriteProductSelector = (state: RootState) =>
  state.favoriteProduct;

export default favoriteProductSlice.reducer;
