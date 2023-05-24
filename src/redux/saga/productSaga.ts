import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { productApi } from '../../apis/productApi';
import { STATUS_CODE } from '../../constants';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  IActiveProduct,
  ICreateProduct,
  IGetAllProductByCategory,
  IGetAllProductParams,
  IGetProductBySlug,
  IProduct,
} from '../../types/product';
import { productActions } from '../slice/productSlice';

function* getAllProductSaga({
  payload,
}: PayloadAction<IGetAllProductParams>): any {
  try {
    const res = yield call(() => {
      return productApi.getAllAdmin(payload);
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
}: PayloadAction<tokenPayloadData<ICreateProduct>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return productApi.create(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(productActions.createProductSuccess());
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
}: PayloadAction<tokenPayloadData<IProduct>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return productApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productActions.editProductSuccess());

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

function* activeProductSaga({
  payload,
}: PayloadAction<tokenPayloadData<IActiveProduct>>): any {
  try {
    const { token, dispatch, data, params } = payload;
    const res = yield call(() => {
      return productApi.activeProduct(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productActions.activeProductSuccess());
      yield put(
        productActions.getAllProduct({
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
    yield put(productActions.activeProductFailed());
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
      return productApi.deleteProduct(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productActions.deleteProductSuccess());
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

function* getAllProductClientSaga({
  payload,
}: PayloadAction<IGetAllProductParams>): any {
  try {
    const res = yield call(() => {
      return productApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productActions.getAllProductClientSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(productActions.getAllProductClientFailed());
  }
}

function* getAllProductByCategoryClientSaga({
  payload,
}: PayloadAction<IGetAllProductByCategory>): any {
  try {
    const res = yield call(() => {
      return productApi.getByCategory(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productActions.getAllProductByCategoryClientSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(productActions.getAllProductByCategoryClientFailed());
  }
}

function* getProductBySlugClient({
  payload,
}: PayloadAction<IGetProductBySlug>): any {
  const { slug } = payload;
  try {
    const res = yield call(() => {
      return productApi.getBySlug(slug);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(productActions.getProductBySlugClientSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(productActions.getProductBySlugClientFailed());
  }
}

function* productSaga() {
  yield takeEvery('product/createProduct', createProductSaga);
  yield takeEvery('product/getAllProduct', getAllProductSaga);
  yield takeEvery('product/editProduct', editProductSaga);
  yield takeEvery('product/deleteProduct', deleteProductSaga);
  yield takeEvery('product/getAllProductClient', getAllProductClientSaga);
  yield takeEvery(
    'product/getAllProductByCategoryClient',
    getAllProductByCategoryClientSaga
  );
  yield takeEvery('product/getProductBySlugClient', getProductBySlugClient);
  yield takeEvery('product/activeProduct', activeProductSaga);
}

export default productSaga;
