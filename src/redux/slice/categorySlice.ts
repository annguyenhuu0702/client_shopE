import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { category } from '../../types/category';
import { RootState } from '../store';

export interface categoryState {
  category: category[];
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
    fetchCategorySuccess: (state, action: PayloadAction<category[]>) => {},
    fetchCategoryFailed: (state) => {},
  },
});

export const categoryActions = CategorySlice.actions;
export const categorySelector = (state: RootState) => state.category;

export default CategorySlice.reducer;
