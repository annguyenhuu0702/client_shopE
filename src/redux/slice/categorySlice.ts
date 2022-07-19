import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { typeCategory } from '../../types/category';

export interface categoryState {
  category : typeCategory[],
  isLoading: boolean,
  error: boolean
}

const initialState: categoryState = {
    category: [],
    isLoading: false,
    error: false
}

const CategorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    fetchCategory: (state) => {
    },
    fetchCategorySuccess: (state, action : PayloadAction<typeCategory[]>) => {
      
    },
    fetchCategoryFailed: (state) => {
      
    }
  }
});

export const categoryActions = CategorySlice.actions;
export default CategorySlice.reducer;
