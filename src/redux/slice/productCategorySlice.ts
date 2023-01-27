import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  createProductCategory,
  getAllProductCategoryParams,
  productCategory,
  updateProductCategory,
} from '../../types/productCategory';
import { RootState } from '../store';

export interface productCategoryState {
  productCategories: resProductCategory;
  currentProductCategory: productCategory | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

export interface resProductCategory {
  rows: productCategory[];
  count: number;
}

const initialState: productCategoryState = {
  productCategories: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 7,
  currentProductCategory: null,
  isLoading: false,
  isError: false,
};

const ProductCategorySlice = createSlice({
  name: 'productCategory',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setProductCategory: (
      state,
      action: PayloadAction<productCategory | null>
    ) => {
      state.currentProductCategory = action.payload;
    },
    getAllProductCategory: (
      state,
      action: PayloadAction<getAllProductCategoryParams>
    ) => {
      state.isLoading = true;
    },
    getAllProductCategorySuccess: (
      state,
      action: PayloadAction<resProductCategory>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.productCategories.rows = action.payload.rows;
      state.productCategories.count = action.payload.count;
    },
    getAllProductCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createProductCategory: (
      state,
      action: PayloadAction<tokenPayloadData<createProductCategory>>
    ) => {
      state.isLoading = true;
    },
    createProductCategorySuccess: (
      state,
      action: PayloadAction<productCategory>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.productCategories.rows.unshift(action.payload);
      state.productCategories.count += 1;
      state.page = 1;
      if (state.productCategories.rows.length > 7) {
        state.productCategories.rows.splice(
          state.productCategories.rows.length - 1,
          1
        );
      }
    },
    createProductCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editProductCategory: (
      state,
      action: PayloadAction<tokenPayloadData<updateProductCategory>>
    ) => {
      state.isLoading = true;
    },
    editProductCategorySuccess: (
      state,
      action: PayloadAction<productCategory>
    ) => {
      state.isLoading = false;
      state.isError = false;
      const index = state.productCategories.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.productCategories.rows[index] = action.payload;
      }
    },
    editProductCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    deleteProductCategory: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteProductCategorySuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.productCategories.rows = state.productCategories.rows.filter(
        (item) => item.id !== action.payload
      );
      state.productCategories.count -= 1;
      if (state.productCategories.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteProductCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const productCategoryActions = ProductCategorySlice.actions;
export const productCategorySelector = (state: RootState) =>
  state.productCategory;

export default ProductCategorySlice.reducer;
