import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { paymentApi } from '../../apis/paymentApi';
import { STATUS_CODE } from '../../constants';
import { Payment, getAllPayment } from '../../types/payment';
import { paymentActions } from '../slice/paymentSlice';
import { deleteParams, tokenPayloadData } from '../../types/common';
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

function* getAllPaymentByUserSaga({
  payload,
}: PayloadAction<getAllPayment>): any {
  try {
    const { token, dispatch, params } = payload;
    const res = yield call(() => {
      return paymentApi.getByUser(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(paymentActions.getAllPaymentByUserSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(paymentActions.getAllPaymentByUserFailed());
  }
}

function* editPaymentSaga({
  payload,
}: PayloadAction<tokenPayloadData<Payment>>): any {
  try {
    const { token, dispatch, data, params } = payload;
    const res = yield call(() => {
      return paymentApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(paymentActions.editPaymentSuccess());
      yield put(
        paymentActions.getAllPayment({
          token,
          dispatch,
          params,
        })
      );
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(paymentActions.editPaymentFailed());
    // yield put(modalActions.hideModal());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deletePaymentSaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return paymentApi.deletePayment(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(paymentActions.deletePaymentSuccess(id));
      yield put(
        paymentActions.getAllPayment({
          token,
          dispatch,
          params: {
            p: params?.p,
            limit: params?.limit,
          },
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(paymentActions.deletePaymentFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deletePaymentClientSaga({
  payload,
}: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return paymentApi.deletePayment(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(paymentActions.deletePaymentClientSuccess(id));
      yield put(
        paymentActions.getAllPaymentByUser({
          token,
          dispatch,
          params: {
            p: params?.p,
            limit: params?.limit,
          },
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(paymentActions.deletePaymentClientFailed());
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
  yield takeEvery('payment/getAllPaymentByUser', getAllPaymentByUserSaga);
  yield takeEvery('payment/editPayment', editPaymentSaga);
  yield takeEvery('payment/deletePaymentClient', deletePaymentClientSaga);
  yield takeEvery('payment/deletePayment', deletePaymentSaga);
}

export default paymentSaga;
