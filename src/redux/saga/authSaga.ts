import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import jwtDecoded from 'jwt-decode';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../apis/authApi';
import { STATUS_CODE } from '../../constants';
import { typeLogin, typeRegister } from '../../types/auth';
import { authActions } from '../slice/authSlice';

function* registerSaga({ payload }: PayloadAction<typeRegister>): any {
  try {
    const { navigate }: any = payload;
    const res = yield call(() => {
      return authApi.register(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(authActions.registerSuccess(data));
      notification.success({
        message: 'Success',
        description: 'Create account success',
        placement: 'bottomRight',
        duration: 2,
      });
      navigate('/');
    }
  } catch (error: any) {
    yield put(authActions.registerFailed());
    notification.error({
      message: 'Error',
      description: 'Email is already exists',
      placement: 'bottomRight',
      duration: 2,
    });

    console.log(error);
  }
}

function* loginSaga({ payload }: PayloadAction<typeLogin>): any {
  try {
    const { navigate }: any = payload;
    const res = yield call(() => {
      return authApi.login(payload);
    });
    const { data, status } = res;
    const role = (jwtDecoded(data.data.access_token) as any).role;
    if (status === STATUS_CODE.CREATED) {
      yield put(authActions.loginSuccess(data));
      navigate(role === 'admin' ? '/admin' : '/');
    }
  } catch (error: any) {
    yield put(authActions.loginFailed());
    notification.error({
      message: 'Error',
      description: 'Email or password wrong!',
      placement: 'bottomRight',
      duration: 2,
    });
    console.log(error);
    console.log(error);
  }
}

function* getProfileSaga({ payload }: PayloadAction<number>): any {
  try {
    const res = yield call(() => {
      return authApi.getProfile(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(authActions.getProfileSuccess(data));
    }
  } catch (error: any) {
    yield put(authActions.getProfileFailed());
    console.log(error);
  }
}

function* authSaga() {
  yield takeEvery('auth/register', registerSaga);
  yield takeEvery('auth/login', loginSaga);
  yield takeEvery('auth/getProfile', getProfileSaga);
}

export default authSaga;
