import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { paymentApi } from '../../apis/paymentApi';
import { STATUS_CODE } from '../../constants';
import { getAllPayment } from '../../types/payment';
import { paymentActions } from '../slice/paymentSlice';

function* getAllPaymentSaga({ payload }: PayloadAction<getAllPayment>): any {
  try {
    const { token, dispatch, params } = payload;
    const res = yield call(() => {
      return paymentApi.getAll(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(paymentActions.getAllPaymentSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(paymentActions.getAllPaymentFailed());
  }
}

function* paymentSaga() {
  yield takeEvery('payment/getAllPayment', getAllPaymentSaga);
}

export default paymentSaga;
