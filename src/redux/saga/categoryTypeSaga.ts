import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { categoryTypeApi } from '../../apis/categoryTypeApi';
import { STATUS_CODE } from '../../constants';
import {
  createCategoryType,
  getAllCategoryTypeParams,
  responseCategoryType,
} from '../../types/categortType';
import { tokenPayload, tokenPayloadDelete } from '../../types/common';
import { categoryTypeActions } from '../slice/categoryTypeSlice';
import { modalActions } from '../slice/modalSlice';

function* getAllCategoryTypeSaga({
  payload,
}: PayloadAction<getAllCategoryTypeParams>): any {
  try {
    const res = yield call(() => {
      return categoryTypeApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryTypeActions.getAllCategoryTypeSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(categoryTypeActions.getAllCategoryTypeFailed());
  }
}

function* createCategoryTypeSaga({
  payload,
}: PayloadAction<tokenPayload<createCategoryType>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return categoryTypeApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(categoryTypeActions.createCategoryTypeSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(categoryTypeActions.createCategoryTypeFailed());
    notification.error({
      message: 'Error',
      description: 'Error',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editCategoryTypeSaga({
  payload,
}: PayloadAction<tokenPayload<responseCategoryType>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return categoryTypeApi.update(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryTypeActions.editCategoryTypeSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(categoryTypeActions.editCategoryTypeFailed());
    notification.error({
      message: 'Error',
      description: 'Error',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteCategoryTypeSaga({
  payload,
}: PayloadAction<tokenPayloadDelete>): any {
  try {
    const { token, dispatch, id, p, limit } = payload;
    const res = yield call(() => {
      return categoryTypeApi.deleteCategoryType(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryTypeActions.deleteCategoryTypeSuccess(id));
      yield put(
        categoryTypeActions.getAllCategoryType({
          p,
          limit,
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(categoryTypeActions.deleteCategoryTypeFailed());
    notification.error({
      message: 'Error',
      description: 'Error',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* categoryTypeSaga() {
  yield takeEvery('categoryType/getAllCategoryType', getAllCategoryTypeSaga);
  yield takeEvery('categoryType/createCategoryType', createCategoryTypeSaga);
  yield takeEvery('categoryType/editCategoryType', editCategoryTypeSaga);
  yield takeEvery('categoryType/deleteCategoryType', deleteCategoryTypeSaga);
}

export default categoryTypeSaga;
