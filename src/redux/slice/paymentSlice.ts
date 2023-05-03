import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { getAllPayment, Payment, updatePayment } from '../../types/payment';
import { RootState } from '../store';

export interface PaymentState {
  payments: resPayment;
  currentPayment: Payment | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;

  // client
  paymentClient: resPayment;
  currentPaymentClient: Payment | null;
  pageClient: number;
  pageSizeClient: number;
  isLoadingClient: boolean;
  isErrorClient: boolean;
}

export interface resPayment {
  rows: Payment[];
  count: number;
}

const initialState: PaymentState = {
  payments: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 12,
  currentPayment: null,
  isLoading: false,
  isError: false,

  // client
  paymentClient: {
    rows: [],
    count: 0,
  },
  currentPaymentClient: null,
  pageClient: 1,
  pageSizeClient: 9,
  isLoadingClient: false,
  isErrorClient: false,
};

const PaymentSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setPayment: (state, action: PayloadAction<Payment | null>) => {
      state.currentPayment = action.payload;
    },
    editPayment: (
      state,
      action: PayloadAction<tokenPayloadData<updatePayment>>
    ) => {
      state.isLoading = true;
    },
    editPaymentSuccess: (state, action: PayloadAction<Payment>) => {
      state.isLoading = false;
      state.isError = false;
      const index = state.payments.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.payments.rows[index] = action.payload;
      }
    },
    editPaymentFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    getAllPayment: (state, action: PayloadAction<getAllPayment>) => {
      state.isLoading = true;
      state.isError = false;
    },
    getAllPaymentSuccess: (state, action: PayloadAction<resPayment>) => {
      state.isLoading = false;
      state.isError = false;
      state.payments.rows = action.payload.rows;
      state.payments.count = action.payload.count;
    },
    getAllPaymentFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deletePayment: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deletePaymentSuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    deletePaymentFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const paymentActions = PaymentSlice.actions;
export const paymentSelector = (state: RootState) => state.payment;

export default PaymentSlice.reducer;
