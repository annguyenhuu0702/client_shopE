import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ICategory,
  ICreateCategory,
  IUpdateCategory,
  IGetAllCategoryParams,
} from '../../types/category';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { RootState } from '../store';

export interface categoryState {
  categories: resCategory;
  currentCategory: ICategory | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  categoriesClient: resCategory;
  currentCategoryClient: ICategory | null;
}

export interface resCategory {
  rows: ICategory[];
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
    setCategory: (state, action: PayloadAction<ICategory | null>) => {
      state.currentCategory = action.payload;
    },
    getAllCategory: (state, action: PayloadAction<IGetAllCategoryParams>) => {
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

    getCategoryBySlug: (
      state,
      action: PayloadAction<IGetAllCategoryParams>
    ) => {
      state.isLoading = true;
    },
    getCategoryBySlugSuccess: (state, action: PayloadAction<ICategory>) => {
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
      action: PayloadAction<tokenPayloadData<ICreateCategory>>
    ) => {
      state.isLoading = true;
    },
    createCategorySuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    createCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editCategory: (
      state,
      action: PayloadAction<tokenPayloadData<IUpdateCategory>>
    ) => {
      state.isLoading = true;
    },
    editCategorySuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    editCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteCategory: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteCategorySuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    deleteCategoryFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    getAllCategoryClient: (
      state,
      action: PayloadAction<IGetAllCategoryParams>
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
  },
});

export const categoryActions = CategorySlice.actions;
export const categorySelector = (state: RootState) => state.category;

export default CategorySlice.reducer;
