import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../apis/authApi';
import { STATUS_CODE } from '../../constants';
import { typeRegister } from '../../types/auth';
import { authActions } from '../slice/authSlice';

function* registerSaga({ payload }: PayloadAction<typeRegister>): any {
  try {
    const {navigate} : any = payload
    const res : any = yield call(() => {
      return authApi.register(payload);
    });
    const { data, status } = res;
    if(status === STATUS_CODE.SUCCESS) {
      yield put(authActions.registerSuccess(data))
      navigate("/")
    }
  } catch (error : any) {
    yield put(authActions.registerFailed(error.response.data.message))
    console.log(error);
  }
}

function* authSaga() {
  yield takeEvery('auth/register', registerSaga);
}

export default authSaga;
