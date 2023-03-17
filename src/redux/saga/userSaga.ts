import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { userApi } from '../../apis/userApi';
import { STATUS_CODE } from '../../constants';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { IUser, ICreateUser, IGetAllUser } from '../../types/user';
import { modalActions } from '../slice/modalSlice';
import { userActions } from '../slice/userSlice';

function* getAllUserSaga({ payload }: PayloadAction<IGetAllUser>): any {
  try {
    const { token, dispatch, params } = payload;
    const res = yield call(() => {
      return userApi.getAll(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(userActions.getAllUserSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.getAllUserFailed());
  }
}

function* createUserSaga({
  payload,
}: PayloadAction<tokenPayloadData<ICreateUser>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return userApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(userActions.createUserSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.createUserFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Email đã tồn tại!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editUserSaga({
  payload,
}: PayloadAction<tokenPayloadData<IUser>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return userApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(userActions.editUserSuccess(data));
      if (data.resetValues) {
        data.resetValues();
      }
      yield put(modalActions.hideModal());
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.editUserFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteUserSaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return userApi.deleteUser(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(userActions.deleteUserSuccess(id));
      yield put(userActions.getAllUser({ token, dispatch, params }));
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.deleteUserFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* userSaga() {
  yield takeEvery('user/getAllUser', getAllUserSaga);
  yield takeEvery('user/createUser', createUserSaga);
  yield takeEvery('user/editUser', editUserSaga);
  yield takeEvery('user/deleteUser', deleteUserSaga);
}

export default userSaga;
