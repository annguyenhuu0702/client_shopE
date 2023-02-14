import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  createProductImage,
  getAllProductImageParams,
  productImage,
  updateProductImage,
} from '../../types/productImage';
import { RootState } from '../store';

export interface productImageState {
  productImages: resProductImage;
  currentProductImage: productImage | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

export interface resProductImage {
  rows: productImage[];
  count: number;
}

const initialState: productImageState = {
  productImages: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 7,
  currentProductImage: null,
  isLoading: false,
  isError: false,
};

const productImageSlice = createSlice({
  name: 'productImage',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setProductImage: (state, action: PayloadAction<productImage | null>) => {
      state.currentProductImage = action.payload;
    },
    getAllProductImage: (
      state,
      action: PayloadAction<getAllProductImageParams>
    ) => {
      state.isLoading = true;
    },
    getAllProductImageSuccess: (
      state,
      action: PayloadAction<resProductImage>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.productImages.rows = action.payload.rows;
      state.productImages.count = action.payload.count;
    },
    getAllProductImageFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createProductImage: (
      state,
      action: PayloadAction<tokenPayloadData<createProductImage>>
    ) => {
      state.isLoading = true;
    },
    createProductImageSuccess: (state, action: PayloadAction<productImage>) => {
      state.isLoading = false;
      state.isError = false;
      state.productImages.rows.unshift(action.payload);
      state.productImages.count += 1;
      state.page = 1;
      if (state.productImages.rows.length > 7) {
        state.productImages.rows.splice(state.productImages.rows.length - 1, 1);
      }
    },
    createProductImageFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editProductImage: (
      state,
      action: PayloadAction<tokenPayloadData<updateProductImage>>
    ) => {
      state.isLoading = true;
    },
    editProductImageSuccess: (state, action: PayloadAction<productImage>) => {
      state.isLoading = false;
      state.isError = false;
      const index = state.productImages.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.productImages.rows[index] = action.payload;
      }
    },
    editProductImageFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    deleteProductImage: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteProductImageSuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.productImages.rows = state.productImages.rows.filter(
        (item) => item.id !== action.payload
      );
      state.productImages.count -= 1;
      if (state.productImages.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteProductImageFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const productImageActions = productImageSlice.actions;
export const productImageSelector = (state: RootState) => state.productImage;

export default productImageSlice.reducer;
