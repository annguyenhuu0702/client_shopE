import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../apis/authApi';
import { authActions } from '../slice/authSlice';
import { typeRegister } from '../../types/auth';
import { STATUS_CODE } from '../../constants';

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

function* authSaga() {
  yield takeEvery('auth/register', registerSaga);
}

export default authSaga;
