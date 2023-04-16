import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  ICreateVariantValue,
  IGetAllSize,
  IUpdateVariantValue,
  IVariantValue,
} from '../../types/variantValue';
import { RootState } from '../store';

export interface userState {
  sizes: resSize;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  currentColor: IVariantValue | null;

  colors: resColor;
  pageColor: number;
  pageSizeColor: number;
  isLoadingColor: boolean;
  isErrorColor: boolean;
  currentSize: IVariantValue | null;
}

export interface resColor {
  rows: IVariantValue[];
  count: number;
}

export interface resSize {
  rows: IVariantValue[];
  count: number;
}

const initialState: userState = {
  sizes: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 12,
  isLoading: false,
  isError: false,
  currentSize: null,

  colors: {
    rows: [],
    count: 0,
  },
  currentColor: null,
  pageColor: 1,
  pageSizeColor: 12,
  isLoadingColor: false,
  isErrorColor: false,
};

const variantValueSlice = createSlice({
  name: 'variantValue',
  initialState: initialState,
  reducers: {
    getAllSize: (state, action: PayloadAction<IGetAllSize>) => {
      state.isLoading = true;
    },
    getAllSizeSuccess: (state, action: PayloadAction<resSize>) => {
      state.isLoading = false;
      state.isError = false;
      state.sizes.rows = action.payload.rows;
      state.sizes.count = action.payload.count;
    },
    getAllSizeFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    createSize: (
      state,
      action: PayloadAction<tokenPayloadData<ICreateVariantValue>>
    ) => {
      state.isLoading = true;
    },
    createSizeSuccess: (state, action: PayloadAction<IVariantValue>) => {
      state.isLoading = false;
      state.isError = false;
      state.page = 1;
      state.sizes.rows.unshift(action.payload);
      state.sizes.count += 1;
      if (state.sizes.rows.length > 7) {
        state.sizes.rows.splice(state.sizes.rows.length - 1, 1);
      }
    },
    createSizeFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setSize: (state, action: PayloadAction<IVariantValue | null>) => {
      state.currentSize = action.payload;
    },
    editSize: (
      state,
      action: PayloadAction<tokenPayloadData<IUpdateVariantValue>>
    ) => {
      state.isLoading = true;
    },
    editSizeSuccess: (state, action: PayloadAction<IVariantValue>) => {
      state.isLoading = false;
      state.isError = false;
      const index = state.sizes.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.sizes.rows[index] = action.payload;
      }
    },
    editSizeFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    deleteSize: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteSizeSuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.sizes.rows = state.sizes.rows.filter(
        (item) => item.id !== action.payload
      );
      state.sizes.count -= 1;
      if (state.sizes.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteSizeFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const variantValueActions = variantValueSlice.actions;
export const variantValueSelector = (state: RootState) => state.variantValue;

export default variantValueSlice.reducer;
