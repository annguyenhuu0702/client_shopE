import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { discountApi } from '../../apis/discount';
import { STATUS_CODE } from '../../constants';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { createDiscount, getAllDiscount } from '../../types/discount';
import { cartActions } from '../slice/cartSlice';
import { discountActions } from '../slice/discountSlice';
import { modalActions } from '../slice/modalSlice';

function* getAllDiscountSaga({ payload }: PayloadAction<getAllDiscount>): any {
  try {
    const { token, dispatch, params } = payload;

    const res = yield call(() => {
      return discountApi.getAll(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(discountActions.getAllDiscountSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(cartActions.getByUserFailed());
  }
}

function* createDiscountSaga({
  payload,
}: PayloadAction<tokenPayloadData<createDiscount>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return discountApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(discountActions.createDiscountSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(discountActions.createDiscountFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Có lỗi khi điền form dữ liệu',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteDiscountSaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return discountApi.deleteDiscount(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(discountActions.deleteDiscountSuccess(id));
      yield put(
        discountActions.getAllDiscount({
          token,
          dispatch,
          params,
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(discountActions.deleteDiscountFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* cartSaga() {
  yield takeEvery('discount/getAllDiscount', getAllDiscountSaga);
  yield takeEvery('discount/createDiscount', createDiscountSaga);
  yield takeEvery('discount/deleteDiscount', deleteDiscountSaga);
}

export default cartSaga;
