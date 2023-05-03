import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { paymentApi } from '../../apis/paymentApi';
import { STATUS_CODE } from '../../constants';
import { Payment, getAllPayment } from '../../types/payment';
import { paymentActions } from '../slice/paymentSlice';
import { tokenPayloadData } from '../../types/common';
import { modalActions } from '../slice/modalSlice';
import { notification } from 'antd';

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

function* editPaymentSaga({
  payload,
}: PayloadAction<tokenPayloadData<Payment>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return paymentApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(paymentActions.editPaymentSuccess(data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(paymentActions.editPaymentFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* paymentSaga() {
  yield takeEvery('payment/getAllPayment', getAllPaymentSaga);
  yield takeEvery('payment/editPayment', editPaymentSaga);
}

export default paymentSaga;
