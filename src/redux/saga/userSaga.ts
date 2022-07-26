import { call, put, takeEvery } from 'redux-saga/effects';
import { userApi } from '../../apis/userApi';
import { STATUS_CODE } from '../../constants';
import { userActions } from '../slice/userSlice';

function* getAllUserSaga(): any {
  try {
    const res = yield call(() => {
      return userApi.getAll();
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

function* userSaga() {
  yield takeEvery('user/getAllUser', getAllUserSaga);
}

export default userSaga;
