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
  pageSizeClient: 5,
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
    editPaymentSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
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
    deletePaymentSuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.payments.rows = state.payments.rows.filter(
        (item) => item.id !== action.payload
      );
      state.payments.count -= 1;
      if (state.payments.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deletePaymentFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    getAllPaymentByUser: (state, action: PayloadAction<getAllPayment>) => {
      state.isLoadingClient = true;
      state.isErrorClient = false;
    },
    getAllPaymentByUserSuccess: (state, action: PayloadAction<resPayment>) => {
      state.isLoadingClient = false;
      state.isErrorClient = false;
      state.paymentClient.rows = action.payload.rows;
      state.paymentClient.count = action.payload.count;
    },
    getAllPaymentByUserFailed: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = true;
    },
    setPaymentClient: (state, action: PayloadAction<Payment | null>) => {
      state.currentPaymentClient = action.payload;
    },
    setPageClient: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.pageClient = action.payload.page;
      state.pageSizeClient = action.payload.pageSize;
    },
    deletePaymentClient: (state, action: PayloadAction<deleteParams>) => {
      state.isLoadingClient = true;
      state.isErrorClient = false;
    },
    deletePaymentClientSuccess: (state, action: PayloadAction<number>) => {
      state.isErrorClient = false;
      state.isLoadingClient = false;
      state.paymentClient.rows = state.paymentClient.rows.filter(
        (item) => item.id !== action.payload
      );
      state.paymentClient.count -= 1;
      if (state.paymentClient.rows.length === 0) {
        state.pageClient = state.pageClient - 1;
      }
    },
    deletePaymentClientFailed: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = true;
    },
  },
});

export const paymentActions = PaymentSlice.actions;
export const paymentSelector = (state: RootState) => state.payment;

export default PaymentSlice.reducer;
