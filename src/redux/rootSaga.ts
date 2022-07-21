import { all } from 'redux-saga/effects';
import authSaga from './saga/authSaga';
import categorySaga from './saga/categorySaga';

function* rootSaga() {
  yield all([authSaga(), categorySaga()]);
}

export default rootSaga;
