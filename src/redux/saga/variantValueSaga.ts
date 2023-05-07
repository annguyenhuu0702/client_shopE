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
      return variantValueApi.createVariantValue(token, dispatch, data);
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
      return variantValueApi.updateVariantValue(token, dispatch, data);
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
      return variantValueApi.deleteVariantValue(token, dispatch, id);
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

function* getAllColorSaga({ payload }: PayloadAction<IGetAllSize>): any {
  try {
    const { token, dispatch, params } = payload;
    const res = yield call(() => {
      return variantValueApi.getAllColor(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(variantValueActions.getAllColorSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(variantValueActions.getAllColorFailed());
  }
}

function* createColorSaga({
  payload,
}: PayloadAction<tokenPayloadData<ICreateVariantValue>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return variantValueApi.createVariantValue(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(variantValueActions.createColorSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(variantValueActions.createColorFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Có lỗi khi điền form dữ liệu!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editColorSaga({
  payload,
}: PayloadAction<tokenPayloadData<IVariantValue>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return variantValueApi.updateVariantValue(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(variantValueActions.editColorSuccess(data));

      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(variantValueActions.editColorFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteColorSaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return variantValueApi.deleteVariantValue(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(variantValueActions.deleteColorSuccess(id));
      yield put(variantValueActions.getAllColor({ token, dispatch, params }));
    }
  } catch (err) {
    console.log(err);
    yield put(variantValueActions.deleteColorFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* getAllSizeClientSaga({ payload }: PayloadAction<IGetAllSize>): any {
  try {
    const { token, dispatch, params } = payload;
    const res = yield call(() => {
      return variantValueApi.getAllSize(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(variantValueActions.getAllSizeClientSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(variantValueActions.getAllSizeClientFailed());
  }
}

function* userSaga() {
  yield takeEvery('variantValue/getAllSize', getAllSizeSaga);
  yield takeEvery('variantValue/createSize', createSizeSaga);
  yield takeEvery('variantValue/editSize', editSizeSaga);
  yield takeEvery('variantValue/deleteSize', deleteSizeSaga);
  yield takeEvery('variantValue/getAllColor', getAllColorSaga);
  yield takeEvery('variantValue/createColor', createColorSaga);
  yield takeEvery('variantValue/editColor', editColorSaga);
  yield takeEvery('variantValue/deleteColor', deleteColorSaga);
  yield takeEvery('variantValue/getAllSizeClient', getAllSizeClientSaga);
}

export default userSaga;
