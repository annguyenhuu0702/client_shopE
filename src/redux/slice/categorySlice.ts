import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  category,
  createCategory,
  getAllCategoryParams,
  updateCategory,
} from '../../types/category';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { RootState } from '../store';

export interface categoryState {
  categories: resCategory;
  currentCategory: category | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  categoriesClient: resCategory;
  currentCategoryClient: category | null;
}

export interface resCategory {
  rows: category[];
  count: number;
}

const initialState: categoryState = {
  // admin
  categories: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 7,
  currentCategory: null,
  isLoading: false,
  isError: false,

  // client
  categoriesClient: {
    rows: [],
    count: 0,
  },
  currentCategoryClient: null,
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
    setCategory: (state, action: PayloadAction<category | null>) => {
      state.currentCategory = action.payload;
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
    getAllCategoryClient: (
      state,
      action: PayloadAction<getAllCategoryParams>
    ) => {
      state.isLoading = true;
    },
    getAllCategoryClientSuccess: (
      state,
      action: PayloadAction<resCategory>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.categoriesClient.rows = action.payload.rows;
      state.categoriesClient.count = action.payload.count;
    },
    getAllCategoryClientFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    getCategoryBySlug: (state, action: PayloadAction<getAllCategoryParams>) => {
      state.isLoading = true;
    },
    getCategoryBySlugSuccess: (state, action: PayloadAction<category>) => {
      state.isLoading = false;
      state.isError = false;
      state.currentCategoryClient = action.payload;
    },
    getCategoryBySlugFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    createCategory: (
      state,
      action: PayloadAction<tokenPayloadData<createCategory>>
    ) => {
      state.isLoading = true;
    },
    createCategorySuccess: (state, action: PayloadAction<category>) => {
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
    editCategory: (
      state,
      action: PayloadAction<tokenPayloadData<updateCategory>>
    ) => {
      state.isLoading = true;
    },
    editCategorySuccess: (state, action: PayloadAction<category>) => {
      state.isLoading = false;
      state.isError = false;
      const index = state.categories.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.categories.rows[index] = action.payload;
      }
    },
    editCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    deleteCategory: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteCategorySuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.categories.rows = state.categories.rows.filter(
        (item) => item.id !== action.payload
      );
      state.categories.count -= 1;
      if (state.categories.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const categoryActions = CategorySlice.actions;
export const categorySelector = (state: RootState) => state.category;

export default CategorySlice.reducer;
