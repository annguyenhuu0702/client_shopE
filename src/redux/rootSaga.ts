import { all } from 'redux-saga/effects';
import authSaga from './saga/authSaga';
import categorySaga from './saga/categorySaga';
import userSaga from './saga/userSaga';
import collectionSaga from './saga/collectionSaga';
import productCategorySaga from './saga/productCategorySaga';
import productSaga from './saga/productSaga';
import productImageSaga from './saga/productImageSaga';
import productVariantSaga from './saga/productVariantSaga';
import variantValueSaga from './saga/variantValueSaga';
import cartSaga from './saga/cartSaga';
import favoriteSaga from './saga/favoriteProductSaga';
import discountSaga from './saga/discountSaga';
import newsSaga from './saga/newsSaga';
import commentSaga from './saga/commentSaga';
import paymentSaga from './saga/PaymentSaga';
import couponSaga from './saga/couponSaga';

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
    variantValueSaga(),
    cartSaga(),
    favoriteSaga(),
    discountSaga(),
    newsSaga(),
    commentSaga(),
    paymentSaga(),
    couponSaga(),
  ]);
}

export default rootSaga;
