import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  ICreateVariantValue,
  IGetAllColor,
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

  // client
  sizesClient: resSize;
  colorsClient: resColor;

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

  // client
  sizesClient: {
    rows: [],
    count: 0,
  },

  colorsClient: {
    rows: [],
    count: 0,
  },
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
    getAllColor: (state, action: PayloadAction<IGetAllColor>) => {
      state.isLoadingColor = true;
    },
    getAllColorSuccess: (state, action: PayloadAction<resColor>) => {
      state.isLoadingColor = false;
      state.isErrorColor = false;
      state.colors.rows = action.payload.rows;
      state.colors.count = action.payload.count;
    },
    getAllColorFailed: (state) => {
      state.isLoadingColor = false;
      state.isErrorColor = true;
    },
    setPageColor: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.pageColor = action.payload.page;
      state.pageSizeColor = action.payload.pageSize;
    },
    createColor: (
      state,
      action: PayloadAction<tokenPayloadData<ICreateVariantValue>>
    ) => {
      state.isLoadingColor = true;
    },
    createColorSuccess: (state, action: PayloadAction<IVariantValue>) => {
      state.isLoadingColor = false;
      state.isErrorColor = false;
      state.page = 1;
      state.colors.rows.unshift(action.payload);
      state.colors.count += 1;
      if (state.colors.rows.length > 7) {
        state.colors.rows.splice(state.colors.rows.length - 1, 1);
      }
    },
    createColorFailed: (state) => {
      state.isLoadingColor = false;
      state.isErrorColor = true;
    },
    setColor: (state, action: PayloadAction<IVariantValue | null>) => {
      state.currentColor = action.payload;
    },
    editColor: (
      state,
      action: PayloadAction<tokenPayloadData<IUpdateVariantValue>>
    ) => {
      state.isLoadingColor = true;
    },
    editColorSuccess: (state, action: PayloadAction<IVariantValue>) => {
      state.isLoadingColor = false;
      state.isErrorColor = false;
      const index = state.colors.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.colors.rows[index] = action.payload;
      }
    },
    editColorFailed: (state) => {
      state.isLoadingColor = false;
      state.isErrorColor = false;
    },
    deleteColor: (state, action: PayloadAction<deleteParams>) => {
      state.isLoadingColor = true;
    },
    deleteColorSuccess: (state, action: PayloadAction<number>) => {
      state.isErrorColor = false;
      state.isLoadingColor = false;
      state.colors.rows = state.colors.rows.filter(
        (item) => item.id !== action.payload
      );
      state.colors.count -= 1;
      if (state.colors.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteColorFailed: (state) => {
      state.isLoadingColor = false;
      state.isErrorColor = true;
    },

    getAllSizeClient: (state, action: PayloadAction<IGetAllSize>) => {
      state.isLoading = true;
    },
    getAllSizeClientSuccess: (state, action: PayloadAction<resSize>) => {
      state.isLoading = false;
      state.isError = false;
      state.sizesClient.rows = action.payload.rows;
      state.sizesClient.count = action.payload.count;
    },
    getAllSizeClientFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const variantValueActions = variantValueSlice.actions;
export const variantValueSelector = (state: RootState) => state.variantValue;

export default variantValueSlice.reducer;
