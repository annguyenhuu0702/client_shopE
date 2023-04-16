import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { variantValueApi } from '../../apis/variantValueApi';
import { STATUS_CODE } from '../../constants';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  ICreateVariantValue,
  IGetAllSize,
  IVariantValue,
} from '../../types/variantValue';
import { modalActions } from '../slice/modalSlice';
import { variantValueActions } from '../slice/variantValueSlice';

function* getAllSizeSaga({ payload }: PayloadAction<IGetAllSize>): any {
  try {
    const { token, dispatch, params } = payload;
    const res = yield call(() => {
      return variantValueApi.getAllSize(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(variantValueActions.getAllSizeSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(variantValueActions.getAllSizeFailed());
  }
}

function* createSizeSaga({
  payload,
}: PayloadAction<tokenPayloadData<ICreateVariantValue>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return variantValueApi.createSize(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(variantValueActions.createSizeSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(variantValueActions.createSizeFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Có lỗi khi điền form dữ liệu!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editSizeSaga({
  payload,
}: PayloadAction<tokenPayloadData<IVariantValue>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return variantValueApi.updateSize(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(variantValueActions.editSizeSuccess(data));

      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(variantValueActions.editSizeFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteSizeSaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return variantValueApi.deleteSize(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(variantValueActions.deleteSizeSuccess(id));
      yield put(variantValueActions.getAllSize({ token, dispatch, params }));
    }
  } catch (err) {
    console.log(err);
    yield put(variantValueActions.deleteSizeFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* userSaga() {
  yield takeEvery('variantValue/getAllSize', getAllSizeSaga);
  yield takeEvery('variantValue/createSize', createSizeSaga);
  yield takeEvery('variantValue/editSize', editSizeSaga);
  yield takeEvery('variantValue/deleteSize', deleteSizeSaga);
}

export default userSaga;
