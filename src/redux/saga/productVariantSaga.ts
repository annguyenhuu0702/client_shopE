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
  IupdateProductOutStock,
} from '../../types/productVariant';
import { productVariantActions } from '../slice/productVariantSlice';
import { modalActions } from '../slice/modalSlice';

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

function* getAllProductVariantOutStockSaga({
  payload,
}: PayloadAction<IGetAllProductVariantParams>): any {
  try {
    const res = yield call(() => {
      return productVariantApi.getAllProductOutStock(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        productVariantActions.getAllProductVariantOutStockSuccess(data.data)
      );
    }
  } catch (err) {
    console.log(err);
    yield put(productVariantActions.getAllProductVariantOutStockFailed());
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

function* editProductOutStockSaga({
  payload,
}: PayloadAction<tokenPayloadData<IupdateProductOutStock>>): any {
  try {
    const { token, dispatch, data, params } = payload;
    const res = yield call(() => {
      return productVariantApi.updateInventory(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productVariantActions.editProductOutStockSuccess());
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
      yield put(
        productVariantActions.getAllProductVariantOutStock({
          p: params?.p,
          limit: params?.limit,
        })
      );
      notification.success({
        message: 'Thành công',
        description: 'Sửa thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(productVariantActions.editProductOutStockFailed());
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
  yield takeEvery(
    'productVariant/getAllProductVariantOutStock',
    getAllProductVariantOutStockSaga
  );
  yield takeEvery(
    'productVariant/editProductOutStock',
    editProductOutStockSaga
  );
}

export default productVariantSaga;
