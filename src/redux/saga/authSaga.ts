import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../apis/authApi';
import { authActions } from '../slice/authSlice';
import { typeLogin, typeRegister } from '../../types/auth';
import { STATUS_CODE } from '../../constants';
import jwtDecoded from 'jwt-decode';

function* registerSaga({ payload }: PayloadAction<typeRegister>): any {
  try {
    const { navigate }: any = payload;
    const res = yield call(() => {
      return authApi.register(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(authActions.registerSuccess(data));
      navigate('/');
    }
  } catch (error: any) {
    yield put(authActions.registerFailed());
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
    console.log(error);
  }
}

function* authSaga() {
  yield takeEvery('auth/register', registerSaga);
  yield takeEvery('auth/login', loginSaga);
  // yield takeEvery('auth/logout', logoutSaga);
}

export default authSaga;
