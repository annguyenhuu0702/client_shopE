import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenPayloadData } from '../../types/common';
import {
  ICreateProductVariant,
  IGetAllProductVariantParams,
  IProductVariant,
  IupdateProductOutStock,
  IUpdateProductVariant,
} from '../../types/productVariant';

import { RootState } from '../store';

export interface productVariantState {
  productVariants: resProductVariant;
  productVariantsOutStock: resProductVariant;
  currentProductVariant: IProductVariant | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;

  pageOut: number;
  pageSizeOut: number;
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
  productVariantsOutStock: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 12,
  currentProductVariant: null,
  isLoading: false,
  isError: false,

  pageOut: 1,
  pageSizeOut: 12,
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

    setPageOut: (
      state,
      action: PayloadAction<{ pageOut: number; pageSizeOut: number }>
    ) => {
      state.pageOut = action.payload.pageOut;
      state.pageSizeOut = action.payload.pageSizeOut;
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

    getAllProductVariantOutStock: (
      state,
      action: PayloadAction<IGetAllProductVariantParams>
    ) => {
      state.isLoading = true;
    },
    getAllProductVariantOutStockSuccess: (
      state,
      action: PayloadAction<resProductVariant>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.productVariantsOutStock.rows = action.payload.rows;
      state.productVariantsOutStock.count = action.payload.count;
    },
    getAllProductVariantOutStockFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    editProductOutStock: (
      state,
      action: PayloadAction<tokenPayloadData<IupdateProductOutStock>>
    ) => {
      state.isLoading = true;
    },
    editProductOutStockSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    editProductOutStockFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const productVariantActions = productVariantSlice.actions;
export const productVariantSelector = (state: RootState) =>
  state.productVariant;

export default productVariantSlice.reducer;
