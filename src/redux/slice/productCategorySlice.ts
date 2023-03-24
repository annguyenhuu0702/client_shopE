import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  IProductCategory,
  ICreateProductCategory,
  IUpdateProductCategory,
  IGetAllProductCategoryParams,
} from '../../types/productCategory';
import { RootState } from '../store';

export interface productCategoryState {
  productCategories: resProductCategory;
  currentProductCategory: IProductCategory | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  currentProductCategoryClient: IProductCategory | null;
}

export interface resProductCategory {
  rows: IProductCategory[];
  count: number;
}

const initialState: productCategoryState = {
  // admin
  productCategories: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 9,
  currentProductCategory: null,
  isLoading: false,
  isError: false,
  // client
  currentProductCategoryClient: null,
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
      action: PayloadAction<IProductCategory | null>
    ) => {
      state.currentProductCategory = action.payload;
    },
    getAllProductCategory: (
      state,
      action: PayloadAction<IGetAllProductCategoryParams>
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
      action: PayloadAction<tokenPayloadData<ICreateProductCategory>>
    ) => {
      state.isLoading = true;
    },
    createProductCategorySuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    createProductCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editProductCategory: (
      state,
      action: PayloadAction<tokenPayloadData<IUpdateProductCategory>>
    ) => {
      state.isLoading = true;
    },
    editProductCategorySuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    editProductCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteProductCategory: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteProductCategorySuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    deleteProductCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    getProductCategoryBySlugClient: (
      state,
      action: PayloadAction<IGetAllProductCategoryParams>
    ) => {
      state.isLoading = true;
    },
    getProductCategoryBySlugClientSuccess: (
      state,
      action: PayloadAction<IProductCategory>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.currentProductCategoryClient = action.payload;
    },
    getProductCategoryBySlugClientFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const productCategoryActions = ProductCategorySlice.actions;
export const productCategorySelector = (state: RootState) =>
  state.productCategory;

export default ProductCategorySlice.reducer;
