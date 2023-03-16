import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { productImageApi } from '../../apis/productImage';
import { routes } from '../../config/routes';
import { STATUS_CODE } from '../../constants';
import { tokenPayloadData } from '../../types/common';
import {
  createProductImage,
  getAllProductImageParams,
} from '../../types/productImage';
import { productImageActions } from '../slice/productImageSlice';

function* getAllProductImageSaga({
  payload,
}: PayloadAction<getAllProductImageParams>): any {
  try {
    const res = yield call(() => {
      return productImageApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productImageActions.getAllProductImageSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(productImageActions.getAllProductImageFailed());
  }
}

function* createProductImageSaga({
  payload,
}: PayloadAction<tokenPayloadData<createProductImage>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return productImageApi.createMany(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(productImageActions.createProductImageSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      navigate(routes.productCategoryAdmin);
      notification.success({
        message: 'Thành công',
        description: 'Thêm thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(productImageActions.createProductImageFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* productImageSaga() {
  yield takeEvery('productImage/createProductImage', createProductImageSaga);
  yield takeEvery('productImage/getAllProductImage', getAllProductImageSaga);
}

export default productImageSaga;
