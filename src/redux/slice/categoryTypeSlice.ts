import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createCategoryType,
  getAllCategoryTypeParams,
  responseCategoryType,
} from '../../types/categortType';
import { tokenPayload } from '../../types/common';
import { RootState } from '../store';

export interface categoryTypeState {
  categoriesType: categoryType;
  isLoading: boolean;
  isError: boolean;
  page: number;
}

export interface categoryType {
  rows: responseCategoryType[];
  count: number;
}

const initialState: categoryTypeState = {
  categoriesType: {
    rows: [],
    count: 0,
  },
  page: 1,
  isLoading: false,
  isError: false,
};

const CategoryTypeSlice = createSlice({
  name: 'categoryType',
  initialState: initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    getAllCategoryType: (
      state,
      action: PayloadAction<getAllCategoryTypeParams>
    ) => {
      state.isLoading = true;
    },
    getAllCategoryTypeSuccess: (state, action: PayloadAction<categoryType>) => {
      state.isLoading = false;
      state.isError = false;
      state.categoriesType.rows = action.payload.rows;
      state.categoriesType.count = action.payload.count;
    },
    getAllCategoryTypeFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createCategoryType: (
      state,
      action: PayloadAction<tokenPayload<createCategoryType>>
    ) => {
      state.isLoading = true;
    },
    createCategoryTypeSuccess: (
      state,
      action: PayloadAction<responseCategoryType>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.categoriesType.rows.unshift(action.payload);
      state.categoriesType.count += 1;
      state.page = 1;
    },
    createCategoryTypeFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const categoryTypeActions = CategoryTypeSlice.actions;
export const categoryTypeSelector = (state: RootState) => state.categoryType;

export default CategoryTypeSlice.reducer;
