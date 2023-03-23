import { all } from 'redux-saga/effects';
import authSaga from './saga/authSaga';
import categorySaga from './saga/categorySaga';
import userSaga from './saga/userSaga';
import collectionSaga from './saga/collectionSaga';
import productCategorySaga from './saga/productCategorySaga';
import productSaga from './saga/productSaga';
import productImageSaga from './saga/productImageSaga';
import productVariantSaga from './saga/productVariantSaga';
import cartSaga from './saga/cartSaga';

function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    categorySaga(),
    collectionSaga(),
    productCategorySaga(),
    productSaga(),
    productImageSaga(),
    productVariantSaga(),
    cartSaga(),
  ]);
}

export default rootSaga;
