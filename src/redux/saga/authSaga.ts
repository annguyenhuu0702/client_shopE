import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import jwtDecoded from 'jwt-decode';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../apis/authApi';
import { STATUS_CODE } from '../../constants';
import {
  changeEmailDto,
  changePasswordDto,
  changeProfileDto,
  loginDto,
  registerDto,
} from '../../types/auth';
import { tokenPayloadData } from '../../types/common';
import { authActions } from '../slice/authSlice';

function* registerSaga({ payload }: PayloadAction<registerDto>): any {
  try {
    const { navigate }: any = payload;
    const res = yield call(() => {
      return authApi.register(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(authActions.registerSuccess(data.data));
      notification.success({
        message: 'Success',
        description: 'Create account success',
        placement: 'bottomRight',
        duration: 3,
      });
      navigate('/');
    }
  } catch (error: any) {
    yield put(authActions.registerFailed());
    notification.error({
      message: 'Error',
      description: 'Email is already exists',
      placement: 'bottomRight',
      duration: 3,
    });

    console.log(error);
  }
}

function* loginSaga({ payload }: PayloadAction<loginDto>): any {
  try {
    const { navigate }: any = payload;
    const res = yield call(() => {
      return authApi.login(payload);
    });
    const { data, status } = res;
    const roleId = (jwtDecoded(data.data.accessToken) as any).roleId;
    console.log(roleId);
    if (status === STATUS_CODE.CREATED) {
      yield put(authActions.loginSuccess(data.data));
      navigate(roleId === 2 ? '/admin' : '/');
    }
  } catch (error: any) {
    yield put(authActions.loginFailed());
    notification.error({
      message: 'Error',
      description: 'Email or password wrong!',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* changeProfileSaga({
  payload,
}: PayloadAction<tokenPayloadData<changeProfileDto>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return authApi.changeProfile(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.changeProfileSuccess(data));
      if (navigate) {
        navigate('/admin');
      }
      notification.success({
        message: 'Success',
        description: 'Change profile success',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (error: any) {
    yield put(authActions.changeProfileFailed());
    console.log(error);
  }
}

function* changePasswordSaga({
  payload,
}: PayloadAction<tokenPayloadData<changePasswordDto>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return authApi.changePassword(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.changePasswordSuccess());
      if (navigate) {
        navigate('/admin');
      }
      notification.success({
        message: 'Success',
        description: 'Change password success',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (error: any) {
    yield put(authActions.changePasswordFailed());
    notification.error({
      message: 'Error',
      description: 'Error',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* changeEmailSaga({
  payload,
}: PayloadAction<tokenPayloadData<changeEmailDto>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return authApi.changeEmail(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.changeEmailSuccess(data));
      if (navigate) {
        navigate('/admin');
      }
      notification.success({
        message: 'Success',
        description: 'Change email success',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (error: any) {
    yield put(authActions.changeEmailFailed());
    notification.error({
      message: 'Error',
      description: 'Error',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* authSaga() {
  yield takeEvery('auth/register', registerSaga);
  yield takeEvery('auth/login', loginSaga);
  yield takeEvery('auth/changeProfile', changeProfileSaga);
  yield takeEvery('auth/changePassword', changePasswordSaga);
  yield takeEvery('auth/changeEmail', changeEmailSaga);
}

export default authSaga;
