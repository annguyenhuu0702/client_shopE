import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { categoryTypeApi } from '../../apis/categoryTypeApi';
import { STATUS_CODE } from '../../constants';
import {
  createCategoryType,
  getAllCategoryTypeParams,
} from '../../types/categortType';
import { tokenPayload } from '../../types/common';
import { categoryTypeActions } from '../slice/categoryTypeSlice';
import { modalActions } from '../slice/modalSlice';
import { userActions } from '../slice/userSlice';

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
    yield put(userActions.getAllUserFailed());
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
    yield put(userActions.createUserFailed());
    notification.error({
      message: 'Error',
      description: 'Category type is already exists',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* categoryTypeSaga() {
  yield takeEvery('categoryType/getAllCategoryType', getAllCategoryTypeSaga);

  yield takeEvery('categoryType/createCategoryType', createCategoryTypeSaga);
}

export default categoryTypeSaga;
