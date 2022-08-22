import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { typeCategory } from '../../types/category';
import { RootState } from '../store';

export interface categoryState {
  category: typeCategory[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: categoryState = {
  category: [],
  isLoading: false,
  isError: false,
};

const CategorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    fetchCategory: (state) => {},
    fetchCategorySuccess: (state, action: PayloadAction<typeCategory[]>) => {},
    fetchCategoryFailed: (state) => {},
  },
});

export const categoryActions = CategorySlice.actions;
export const cateogorySelector = (state: RootState) => state.category;

export default CategorySlice.reducer;
