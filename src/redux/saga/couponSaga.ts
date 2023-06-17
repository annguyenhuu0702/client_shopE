import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { coupontApi } from '../../apis/coupon';
import { STATUS_CODE } from '../../constants';
import { tokenPayloadData } from '../../types/common';
import { createCoupon, getAllCoupon } from '../../types/coupon';
import { couponActions } from '../slice/couponSlice';
import { modalActions } from '../slice/modalSlice';

function* getAllCouponSaga({ payload }: PayloadAction<getAllCoupon>): any {
  try {
    const { token, dispatch, params } = payload;
    const res = yield call(() => {
      return coupontApi.getAll(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(couponActions.getAllCouponSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(couponActions.getAllCouponFailed());
  }
}

function* createCouponSaga({
  payload,
}: PayloadAction<tokenPayloadData<createCoupon>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return coupontApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(couponActions.createCouponSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(couponActions.createCouponFailed());
  }
}

function* couponSaga() {
  yield takeEvery('coupon/getAllCoupon', getAllCouponSaga);
  yield takeEvery('coupon/createCoupon', createCouponSaga);
}

export default couponSaga;
