import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { productCategoryApi } from '../../apis/productCategoryApi';
import { routes } from '../../config/routes';
import { STATUS_CODE } from '../../constants';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  createProductCategory,
  getAllProductCategoryParams,
  productCategory,
} from '../../types/productCategory';
import { productCategoryActions } from '../slice/productCategorySlice';

function* getAllProductCategorySaga({
  payload,
}: PayloadAction<getAllProductCategoryParams>): any {
  try {
    const res = yield call(() => {
      return productCategoryApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productCategoryActions.getAllProductCategorySuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(productCategoryActions.getAllProductCategoryFailed());
  }
}

function* createProductCategorySaga({
  payload,
}: PayloadAction<tokenPayloadData<createProductCategory>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return productCategoryApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(
        productCategoryActions.createProductCategorySuccess(newData.data)
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
    yield put(productCategoryActions.createProductCategoryFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editProductCategorySaga({
  payload,
}: PayloadAction<tokenPayloadData<productCategory>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return productCategoryApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productCategoryActions.editProductCategorySuccess(data));
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
    yield put(productCategoryActions.editProductCategoryFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteProductCategorySaga({
  payload,
}: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return productCategoryApi.deleteProductCategory(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productCategoryActions.deleteProductCategorySuccess(id));
      yield put(
        productCategoryActions.getAllProductCategory({
          p: params?.p,
          limit: params?.limit,
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(productCategoryActions.deleteProductCategoryFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* productCategorySaga() {
  yield takeEvery(
    'productCategory/createProductCategory',
    createProductCategorySaga
  );
  yield takeEvery(
    'productCategory/getAllProductCategory',
    getAllProductCategorySaga
  );
  yield takeEvery(
    'productCategory/editProductCategory',
    editProductCategorySaga
  );
  yield takeEvery(
    'productCategory/deleteProductCategory',
    deleteProductCategorySaga
  );
}

export default productCategorySaga;
