import { takeEvery } from 'redux-saga/effects';

function* registerSaga(): any {
  try {
    yield console.log("hello")   
  } catch (error : any) {
    console.log(error);
  }
}

function* authSaga() {
  yield takeEvery('auth/register', registerSaga);
}

export default authSaga;
