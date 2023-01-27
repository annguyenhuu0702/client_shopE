import { all } from 'redux-saga/effects';
import authSaga from './saga/authSaga';
import categorySaga from './saga/categorySaga';
import userSaga from './saga/userSaga';
import collectionSaga from './saga/collectionSaga';
import productCategorySaga from './saga/productCategorySaga';

function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    categorySaga(),
    collectionSaga(),
    productCategorySaga(),
  ]);
}

export default rootSaga;
