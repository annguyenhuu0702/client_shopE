import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  createProduct,
  getAllProductParams,
  product,
  updateProduct,
} from '../../types/product';

import { RootState } from '../store';

export interface productState {
  products: resProduct;
  currentProduct: product | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

export interface resProduct {
  rows: product[];
  count: number;
}

const initialState: productState = {
  products: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 7,
  currentProduct: null,
  isLoading: false,
  isError: false,
};

const ProductSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setProduct: (state, action: PayloadAction<product | null>) => {
      state.currentProduct = action.payload;
    },
    getAllProduct: (state, action: PayloadAction<getAllProductParams>) => {
      state.isLoading = true;
    },
    getAllProductSuccess: (state, action: PayloadAction<resProduct>) => {
      state.isLoading = false;
      state.isError = false;
      state.products.rows = action.payload.rows;
      state.products.count = action.payload.count;
    },
    getAllProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createProduct: (
      state,
      action: PayloadAction<tokenPayloadData<createProduct>>
    ) => {
      state.isLoading = true;
    },
    createProductSuccess: (state, action: PayloadAction<product>) => {
      state.isLoading = false;
      state.isError = false;
      state.products.rows.unshift(action.payload);
      state.products.count += 1;
      state.page = 1;
      if (state.products.rows.length > 7) {
        state.products.rows.splice(state.products.rows.length - 1, 1);
      }
    },
    createProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editProduct: (
      state,
      action: PayloadAction<tokenPayloadData<updateProduct>>
    ) => {
      state.isLoading = true;
    },
    editProductSuccess: (state, action: PayloadAction<product>) => {
      state.isLoading = false;
      state.isError = false;
      const index = state.products.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.products.rows[index] = action.payload;
      }
    },
    editProductFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    deleteProduct: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteProductSuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.products.rows = state.products.rows.filter(
        (item) => item.id !== action.payload
      );
      state.products.count -= 1;
      if (state.products.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const productActions = ProductSlice.actions;
export const productSelector = (state: RootState) => state.product;

export default ProductSlice.reducer;
