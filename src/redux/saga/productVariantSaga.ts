import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { productVariantApi } from '../../apis/productVariant';
import { STATUS_CODE } from '../../constants';
import { tokenPayloadData } from '../../types/common';
import {
  ICreateProductVariant,
  IGetAllProductVariantParams,
  IUpdateProductVariant,
} from '../../types/productVariant';
import { productVariantActions } from '../slice/productVariantSlice';

function* getAllProductVariantSaga({
  payload,
}: PayloadAction<IGetAllProductVariantParams>): any {
  try {
    const res = yield call(() => {
      return productVariantApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productVariantActions.getAllProductVariantSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(productVariantActions.getAllProductVariantFailed());
  }
}

function* createProductVariantSaga({
  payload,
}: PayloadAction<tokenPayloadData<ICreateProductVariant[]>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return productVariantApi.create(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(productVariantActions.createProductVariantSuccess());
      notification.success({
        message: 'Thành công',
        description: 'Thêm thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(productVariantActions.createProductVariantFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editProductVariantSaga({
  payload,
}: PayloadAction<tokenPayloadData<IUpdateProductVariant>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return productVariantApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productVariantActions.editProductVariantSuccess());
      notification.success({
        message: 'Thành công',
        description: 'Sửa thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(productVariantActions.editProductVariantFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* productVariantSaga() {
  yield takeEvery(
    'productVariant/createProductVariant',
    createProductVariantSaga
  );
  yield takeEvery(
    'productVariant/getAllProductVariant',
    getAllProductVariantSaga
  );
  yield takeEvery('productVariant/editProductVariant', editProductVariantSaga);
}

export default productVariantSaga;
