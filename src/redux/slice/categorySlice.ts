import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  category,
  createCategory,
  getAllCategoryParams,
} from '../../types/category';
import { tokenPayload } from '../../types/common';
import { RootState } from '../store';

export interface categoryState {
  categories: resCategory;
  currentCategory: category | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

export interface resCategory {
  rows: category[];
  count: number;
}

const initialState: categoryState = {
  categories: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 7,
  currentCategory: null,
  isLoading: false,
  isError: false,
};

const CategorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    getAllCategory: (state, action: PayloadAction<getAllCategoryParams>) => {
      state.isLoading = true;
    },
    getAllCategorySuccess: (state, action: PayloadAction<resCategory>) => {
      state.isLoading = false;
      state.isError = false;
      state.categories.rows = action.payload.rows;
      state.categories.count = action.payload.count;
    },
    getAllCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createCategory: (
      state,
      action: PayloadAction<tokenPayload<createCategory>>
    ) => {
      state.isLoading = true;
    },
    createCategorySuccess: (state, action: PayloadAction<category>) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = false;
      state.categories.rows.unshift(action.payload);
      state.categories.count += 1;
      state.page = 1;
      if (state.categories.rows.length > 7) {
        state.categories.rows.splice(state.categories.rows.length - 1, 1);
      }
    },
    createCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const categoryActions = CategorySlice.actions;
export const categorySelector = (state: RootState) => state.category;

export default CategorySlice.reducer;
