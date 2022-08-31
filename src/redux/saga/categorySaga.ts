import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { categoryApi } from '../../apis/categoryApi';
import { STATUS_CODE } from '../../constants';
import {
  createCategory,
  getAllCategoryParams,
  updateCategory,
} from '../../types/category';
import { tokenPayload, tokenPayloadDelete } from '../../types/common';
import { categoryActions } from '../slice/categorySlice';
import { modalActions } from '../slice/modalSlice';

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

function* createCategorySaga({
  payload,
}: PayloadAction<tokenPayload<createCategory>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return categoryApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(categoryActions.createCategorySuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(categoryActions.createCategoryFailed());
    notification.error({
      message: 'Error',
      description: 'Error',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editCategorySaga({
  payload,
}: PayloadAction<tokenPayload<updateCategory>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return categoryApi.update(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryActions.editCategorySuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(categoryActions.editCategoryFailed());
    notification.error({
      message: 'Error',
      description: 'Error',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteCategorySaga({
  payload,
}: PayloadAction<tokenPayloadDelete>): any {
  try {
    const { token, dispatch, id, p, limit } = payload;
    const res = yield call(() => {
      return categoryApi.deleteCategory(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryActions.deleteCategorySuccess(id));
      yield put(
        categoryActions.getAllCategory({
          p,
          limit,
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(categoryActions.deleteCategoryFailed());
    notification.error({
      message: 'Error',
      description: 'Error',
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
}

export default categorySaga;
