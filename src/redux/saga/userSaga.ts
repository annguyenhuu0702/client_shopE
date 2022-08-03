import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { userApi } from '../../apis/userApi';
import { STATUS_CODE } from '../../constants';
import { QueryParams } from '../../types/common';
import { typeCreateUser, typeUser } from '../../types/user';
import { modalActions } from '../slice/modalSlice';
import { userActions } from '../slice/userSlice';

function* getAllUserSaga({ payload }: PayloadAction<QueryParams>): any {
  try {
    const res = yield call(() => {
      return userApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(userActions.getAllUserSuccess(data));
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.getAllUserFailed());
  }
}

function* createUserSaga({ payload }: PayloadAction<typeCreateUser>): any {
  try {
    const res = yield call(() => {
      return userApi.create(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(userActions.createUserSuccess(data));
      if (payload.resetValues) {
        payload.resetValues();
      }
      yield put(modalActions.hideModal());
      yield put(userActions.getAllUser({}));
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.createUserFailed());
    notification.error({
      message: 'Error',
      description: 'Email is already exists',
      placement: 'bottomRight',
      duration: 2,
    });
  }
}

function* editUserSaga({ payload }: PayloadAction<typeUser>): any {
  try {
    const res = yield call(() => {
      return userApi.update(payload, payload.id);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(userActions.editUserSuccess(data));
      if (payload.resetValues) {
        payload.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.editUserFailed());
    notification.error({
      message: 'Error',
      description: 'Email is already exists',
      placement: 'bottomRight',
      duration: 2,
    });
  }
}

function* userSaga() {
  yield takeEvery('user/getAllUser', getAllUserSaga);
  yield takeEvery('user/createUser', createUserSaga);
  yield takeEvery('user/editUser', editUserSaga);
}

export default userSaga;
