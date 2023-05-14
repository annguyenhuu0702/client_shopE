import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createDiscount, Discount, getAllDiscount } from '../../types/discount';
import { RootState } from '../store';
import { deleteParams, tokenPayloadData } from '../../types/common';

export interface DiscountState {
  discount: resDiscount;
  currentDiscount: Discount | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

export interface resDiscount {
  rows: Discount[];
  count: number;
}

const initialState: DiscountState = {
  discount: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 9,
  currentDiscount: null,
  isLoading: false,
  isError: false,
};

const DiscountSlice = createSlice({
  name: 'discount',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setDiscount: (state, action: PayloadAction<Discount | null>) => {
      state.currentDiscount = action.payload;
    },
    getAllDiscount: (state, action: PayloadAction<getAllDiscount>) => {
      state.isLoading = true;
      state.isError = false;
    },
    getAllDiscountSuccess: (state, action: PayloadAction<resDiscount>) => {
      state.isLoading = false;
      state.isError = false;
      state.discount.rows = action.payload.rows;
      state.discount.count = action.payload.count;
    },
    getAllDiscountFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createDiscount: (
      state,
      actions: PayloadAction<tokenPayloadData<createDiscount>>
    ) => {
      state.isLoading = true;
      state.isError = false;
    },
    createDiscountSuccess: (state, action: PayloadAction<Discount>) => {
      state.isLoading = false;
      state.isError = false;
      state.page = 1;
      state.discount.rows.unshift(action.payload);
      state.discount.count += 1;
      if (state.discount.rows.length > 7) {
        state.discount.rows.splice(state.discount.rows.length - 1, 1);
      }
    },
    createDiscountFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteDiscount: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteDiscountSuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.discount.rows = state.discount.rows.filter(
        (item) => item.id !== action.payload
      );
      state.discount.count -= 1;
      if (state.discount.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteDiscountFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const discountActions = DiscountSlice.actions;
export const discountSelector = (state: RootState) => state.discount;

export default DiscountSlice.reducer;
