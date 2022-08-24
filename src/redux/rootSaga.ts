import { all } from 'redux-saga/effects';
import authSaga from './saga/authSaga';
import categorySaga from './saga/categorySaga';
import categoryTypeSaga from './saga/categoryTypeSaga';
import userSaga from './saga/userSaga';

function* rootSaga() {
  yield all([authSaga(), categorySaga(), categoryTypeSaga(), userSaga()]);
}

export default rootSaga;
