import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  IProduct,
  ICreateProduct,
  IUpdateProduct,
  IGetAllProductParams,
} from '../../types/product';

import { RootState } from '../store';

export interface productState {
  products: resProduct;
  currentProduct: IProduct | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;

  // client
  productsClient: resProduct;
  currentProductClient: IProduct | null;
  pageClient: number;
  pageSizeClient: number;
  isLoadingClient: boolean;
  isErrorClient: boolean;
}

export interface resProduct {
  rows: IProduct[];
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
  // client
  productsClient: {
    rows: [],
    count: 0,
  },
  currentProductClient: null,
  pageClient: 1,
  pageSizeClient: 12,
  isLoadingClient: false,
  isErrorClient: false,
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
    setProduct: (state, action: PayloadAction<IProduct | null>) => {
      state.currentProduct = action.payload;
    },
    getAllProduct: (state, action: PayloadAction<IGetAllProductParams>) => {
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
      action: PayloadAction<tokenPayloadData<ICreateProduct>>
    ) => {
      state.isLoading = true;
    },
    createProductSuccess: (state, action: PayloadAction<IProduct>) => {
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
      action: PayloadAction<tokenPayloadData<IUpdateProduct>>
    ) => {
      state.isLoading = true;
    },
    editProductSuccess: (state, action: PayloadAction<IProduct>) => {
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
    updateThumbnail: (
      state,
      { payload }: PayloadAction<{ id: number; thumbnail: string }>
    ) => {
      const { id, thumbnail } = payload;

      const index = state.products.rows.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.products.rows[index].thumbnail = thumbnail;
        if (state.currentProduct) {
          state.currentProduct.thumbnail = thumbnail;
        }
      }
    },
    getAllProductClient: (
      state,
      action: PayloadAction<IGetAllProductParams>
    ) => {
      state.isLoadingClient = true;
    },
    getAllProductClientSuccess: (state, action: PayloadAction<resProduct>) => {
      state.isLoadingClient = false;
      state.isErrorClient = false;
      state.productsClient.rows = action.payload.rows;
      state.productsClient.count = action.payload.count;
    },
    getAllProductClientFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setPageClient: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.pageClient = action.payload.page;
      state.pageSizeClient = action.payload.pageSize;
    },
  },
});

export const productActions = ProductSlice.actions;
export const productSelector = (state: RootState) => state.product;

export default ProductSlice.reducer;
