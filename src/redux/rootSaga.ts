import { all } from 'redux-saga/effects';
import authSaga from './saga/authSaga';
import categorySaga from './saga/categorySaga';
import userSaga from './saga/userSaga';

function* rootSaga() {
  yield all([authSaga(), categorySaga(), userSaga()]);
}

export default rootSaga;
