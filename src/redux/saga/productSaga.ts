import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { productApi } from '../../apis/productApi';
import { STATUS_CODE } from '../../constants';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  createProduct,
  getAllProductParams,
  product,
} from '../../types/product';
import { productActions } from '../slice/productSlice';

function* getAllProductSaga({
  payload,
}: PayloadAction<getAllProductParams>): any {
  try {
    const res = yield call(() => {
      return productApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productActions.getAllProductSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(productActions.getAllProductFailed());
  }
}

function* createProductSaga({
  payload,
}: PayloadAction<tokenPayloadData<createProduct>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return productApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(productActions.createProductSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      navigate('/admin/product');
      notification.success({
        message: 'Thành công',
        description: 'Thêm thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(productActions.createProductFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editProductSaga({
  payload,
}: PayloadAction<tokenPayloadData<product>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return productApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productActions.editProductSuccess(data));
      if (data.resetValues) {
        data.resetValues();
      }
      navigate('/admin/product');
      notification.success({
        message: 'Thành công',
        description: 'Sửa thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(productActions.editProductFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteProductSaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return productApi.deleteCategory(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productActions.deleteProductSuccess(id));
      yield put(
        productActions.getAllProduct({ p: params?.p, limit: params?.limit })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(productActions.deleteProductFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* productSaga() {
  yield takeEvery('product/createProduct', createProductSaga);
  yield takeEvery('product/getAllProduct', getAllProductSaga);
  yield takeEvery('product/editProduct', editProductSaga);
  yield takeEvery('product/deleteProduct', deleteProductSaga);
}

export default productSaga;