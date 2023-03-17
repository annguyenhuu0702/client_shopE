import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenPayloadData } from '../../types/common';
import {
  ICreateProductImage,
  IGetAllProductImageParams,
  IProductImage,
} from '../../types/productImage';
import { RootState } from '../store';

export interface productImageState {
  productImages: resProductImage;
  currentProductImage: IProductImage | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

export interface resProductImage {
  rows: IProductImage[];
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
    setProductImage: (state, action: PayloadAction<IProductImage | null>) => {
      state.currentProductImage = action.payload;
    },
    getAllProductImage: (
      state,
      action: PayloadAction<IGetAllProductImageParams>
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
      action: PayloadAction<tokenPayloadData<ICreateProductImage>>
    ) => {
      state.isLoading = true;
    },
    createProductImageSuccess: (
      state,
      action: PayloadAction<IProductImage>
    ) => {
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
  },
});

export const productImageActions = productImageSlice.actions;
export const productImageSelector = (state: RootState) => state.productImage;

export default productImageSlice.reducer;
