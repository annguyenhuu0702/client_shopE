import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createCategoryType,
  getAllCategoryTypeParams,
  responseCategoryType,
} from '../../types/categortType';
import { tokenPayload, tokenPayloadDelete } from '../../types/common';
import { RootState } from '../store';

export interface categoryTypeState {
  categoriesType: categoryType;
  currentCategoryType: responseCategoryType | null;
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
  currentCategoryType: null,
};

const CategoryTypeSlice = createSlice({
  name: 'categoryType',
  initialState: initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCategoryType: (
      state,
      action: PayloadAction<responseCategoryType | null>
    ) => {
      state.currentCategoryType = action.payload;
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
      if (state.categoriesType.rows.length > 7) {
        state.categoriesType.rows.splice(
          state.categoriesType.rows.length - 1,
          1
        );
      }
    },
    createCategoryTypeFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editCategoryType: (
      state,
      action: PayloadAction<tokenPayload<responseCategoryType>>
    ) => {
      state.isLoading = true;
    },
    editCategoryTypeSuccess: (
      state,
      action: PayloadAction<responseCategoryType>
    ) => {
      state.isLoading = false;
      state.isError = false;
      const index = state.categoriesType.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.categoriesType.rows[index] = action.payload;
      }
    },
    editCategoryTypeFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    deleteCategoryType: (state, action: PayloadAction<tokenPayloadDelete>) => {
      state.isLoading = true;
    },
    deleteCategoryTypeSuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.categoriesType.rows = state.categoriesType.rows.filter(
        (item) => item.id !== action.payload
      );
      state.categoriesType.count -= 1;
      if (state.categoriesType.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteCategoryTypeFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const categoryTypeActions = CategoryTypeSlice.actions;
export const categoryTypeSelector = (state: RootState) => state.categoryType;

export default CategoryTypeSlice.reducer;
