import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  ICreateProductVariant,
  IUpdateProductVariant,
  IGetAllProductVariantParams,
  IProductVariant,
} from '../../types/productVariant';

import { RootState } from '../store';

export interface productVariantState {
  productVariants: resProductVariant;
  currentProductVariant: IProductVariant | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

export interface resProductVariant {
  rows: IProductVariant[];
  count: number;
}

const initialState: productVariantState = {
  productVariants: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 7,
  currentProductVariant: null,
  isLoading: false,
  isError: false,
};

const productVariantSlice = createSlice({
  name: 'productVariant',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setProductVariant: (
      state,
      action: PayloadAction<IProductVariant | null>
    ) => {
      state.currentProductVariant = action.payload;
    },
    getAllProductVariant: (
      state,
      action: PayloadAction<IGetAllProductVariantParams>
    ) => {
      state.isLoading = true;
    },
    getAllProductVariantSuccess: (
      state,
      action: PayloadAction<resProductVariant>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.productVariants.rows = action.payload.rows;
      state.productVariants.count = action.payload.count;
    },
    getAllProductVariantFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createProductVariant: (
      state,
      action: PayloadAction<tokenPayloadData<ICreateProductVariant[]>>
    ) => {
      state.isLoading = true;
    },
    createProductVariantSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    createProductVariantFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editProductVariant: (
      state,
      action: PayloadAction<tokenPayloadData<IUpdateProductVariant>>
    ) => {
      state.isLoading = true;
    },
    editProductVariantSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    editProductVariantFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteProductVariant: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteProductVariantSuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    deleteProductVariantFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const productVariantActions = productVariantSlice.actions;
export const productVariantSelector = (state: RootState) =>
  state.productVariant;

export default productVariantSlice.reducer;
