import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { userApi } from '../../apis/userApi';
import { STATUS_CODE } from '../../constants';
import { QueryParams } from '../../types/common';
import { typeCreateUser } from '../../types/user';
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
      yield put(userActions.getAllUser({}));
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.createUserFailed());
  }
}

function* userSaga() {
  yield takeEvery('user/getAllUser', getAllUserSaga);
  yield takeEvery('user/createUser', createUserSaga);
}

export default userSaga;
