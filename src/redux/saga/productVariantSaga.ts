import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { productVariantApi } from '../../apis/productVariant';
import { routes } from '../../config/routes';
import { STATUS_CODE } from '../../constants';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  ICreateProductVariant,
  IGetAllProductProductVariantParams,
  IProductVariant,
} from '../../types/productVariant';
import { productVariantActions } from '../slice/productVariantSlice';

function* getAllProductVariantSaga({
  payload,
}: PayloadAction<IGetAllProductProductVariantParams>): any {
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
}: PayloadAction<tokenPayloadData<ICreateProductVariant>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return productVariantApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(
        productVariantActions.createProductVariantSuccess(newData.data)
      );
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
}: PayloadAction<tokenPayloadData<IProductVariant>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return productVariantApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productVariantActions.editProductVariantSuccess(data));
      if (data.resetValues) {
        data.resetValues();
      }
      navigate(routes.productCategoryAdmin);
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

function* deleteProductVariantSaga({
  payload,
}: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return productVariantApi.deleteProductVariant(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productVariantActions.deleteProductVariantSuccess(id));
      yield put(
        productVariantActions.getAllProductVariant({
          p: params?.p,
          limit: params?.limit,
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(productVariantActions.deleteProductVariantFailed());
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
    'productVariant/deleteProductVariant',
    deleteProductVariantSaga
  );
}

export default productVariantSaga;
