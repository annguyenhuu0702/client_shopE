import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { categoryApi } from '../../apis/categoryApi';
import { STATUS_CODE } from '../../constants';
import {
  category,
  createCategory,
  getAllCategoryParams,
} from '../../types/category';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { categoryActions } from '../slice/categorySlice';

function* getAllCategorySaga({
  payload,
}: PayloadAction<getAllCategoryParams>): any {
  try {
    const res = yield call(() => {
      return categoryApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryActions.getAllCategorySuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(categoryActions.getAllCategoryFailed());
  }
}

function* getAllCategoryClientSaga({
  payload,
}: PayloadAction<getAllCategoryParams>): any {
  try {
    const res = yield call(() => {
      return categoryApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryActions.getAllCategoryClientSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(categoryActions.getAllCategoryClientFailed());
  }
}

function* getCategoryBySlugSaga({
  payload,
}: PayloadAction<getAllCategoryParams>): any {
  try {
    const res = yield call(() => {
      return categoryApi.getAll({
        collections: true,
        slug: payload.slug,
      });
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryActions.getCategoryBySlugSuccess(data.data.rows[0]));
    }
  } catch (err) {
    console.log(err);
    yield put(categoryActions.getCategoryBySlugFailed());
  }
}

function* createCategorySaga({
  payload,
}: PayloadAction<tokenPayloadData<createCategory>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return categoryApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(categoryActions.createCategorySuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      navigate('/admin/category');
      notification.success({
        message: 'Thành công',
        description: 'Thêm thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(categoryActions.createCategoryFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editCategorySaga({
  payload,
}: PayloadAction<tokenPayloadData<category>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return categoryApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryActions.editCategorySuccess(data));
      if (data.resetValues) {
        data.resetValues();
      }
      navigate('/admin/category');
      notification.success({
        message: 'Thành công',
        description: 'Sửa thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(categoryActions.editCategoryFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteCategorySaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return categoryApi.deleteCategory(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryActions.deleteCategorySuccess(id));
      yield put(
        categoryActions.getAllCategory({ p: params?.p, limit: params?.limit })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(categoryActions.deleteCategoryFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* categorySaga() {
  yield takeEvery('category/createCategory', createCategorySaga);
  yield takeEvery('category/getAllCategory', getAllCategorySaga);
  yield takeEvery('category/editCategory', editCategorySaga);
  yield takeEvery('category/deleteCategory', deleteCategorySaga);
  yield takeEvery('category/getAllCategoryClient', getAllCategoryClientSaga);
  yield takeEvery('category/getCategoryBySlug', getCategoryBySlugSaga);
}

export default categorySaga;
