import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenPayloadData } from '../../types/common';
import { createCoupon, getAllCoupon, TCoupon } from '../../types/coupon';
import { RootState } from '../store';

export interface CouponState {
  coupon: resCoupon;
  currentCoupon: TCoupon | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

export interface resCoupon {
  rows: TCoupon[];
  count: number;
}

const initialState: CouponState = {
  coupon: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 9,
  currentCoupon: null,
  isLoading: false,
  isError: false,
};

const CouponSlice = createSlice({
  name: 'coupon',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setCoupon: (state, action: PayloadAction<TCoupon | null>) => {
      state.currentCoupon = action.payload;
    },
    getAllCoupon: (state, action: PayloadAction<getAllCoupon>) => {
      state.isLoading = true;
      state.isError = false;
    },
    getAllCouponSuccess: (state, action: PayloadAction<resCoupon>) => {
      state.isLoading = false;
      state.isError = false;
      state.coupon.rows = action.payload.rows;
      state.coupon.count = action.payload.count;
    },
    getAllCouponFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createCoupon: (
      state,
      actions: PayloadAction<tokenPayloadData<createCoupon>>
    ) => {
      state.isLoading = true;
      state.isError = false;
    },
    createCouponSuccess: (state, action: PayloadAction<TCoupon>) => {
      state.isLoading = false;
      state.isError = false;
      state.page = 1;
      state.coupon.rows.unshift(action.payload);
      state.coupon.count += 1;
      if (state.coupon.rows.length > 7) {
        state.coupon.rows.splice(state.coupon.rows.length - 1, 1);
      }
    },
    createCouponFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const couponActions = CouponSlice.actions;
export const couponSelector = (state: RootState) => state.coupon;

export default CouponSlice.reducer;
