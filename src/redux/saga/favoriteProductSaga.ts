import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { favoriteProductApi } from '../../apis/favoriteProductApi';
import { STATUS_CODE } from '../../constants';
import { tokenPayloadData, tokenPayload } from '../../types/common';
import {
  createFavoriteProduct,
  deleteFavoriteProduct,
} from '../../types/favoriteProduct';
import { favoriteProductActions } from '../slice/favoriteProductSlice';

function* getFavoriteProductByUserSaga({
  payload,
}: PayloadAction<tokenPayload>): any {
  try {
    const { token, dispatch } = payload;
    const res = yield call(() => {
      return favoriteProductApi.getFavoriteProductByUser(token, dispatch);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        favoriteProductActions.getFavoriteProductByUserSuccess(data.data)
      );
    }
  } catch (err) {
    console.log(err);
    yield put(favoriteProductActions.getFavoriteProductByUserFailed());
  }
}

function* createFavoriteSaga({
  payload,
}: PayloadAction<tokenPayloadData<createFavoriteProduct>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return favoriteProductApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(
        favoriteProductActions.createFavoriteProductSuccess(newData.data)
      );
      notification.success({
        message: 'Thành công',
        description: 'Thêm sản phẩm yêu thích thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(favoriteProductActions.createFavoriteProductFailed());
  }
}

function* deleteFavoriteSaga({
  payload,
}: PayloadAction<deleteFavoriteProduct>): any {
  try {
    const { token, dispatch, productId } = payload;
    const res = yield call(() => {
      return favoriteProductApi.deleteFavoriteProduct(
        token,
        dispatch,
        productId
      );
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(favoriteProductActions.deleteFavoriteProductSuccess(productId));
      notification.success({
        message: 'Thành công',
        description: 'Xóa sản phẩm yêu thích thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(favoriteProductActions.deleteFavoriteProductFailed());
  }
}

function* favoriteProductSaga() {
  yield takeEvery(
    'favoriteProduct/getFavoriteProductByUser',
    getFavoriteProductByUserSaga
  );
  yield takeEvery('favoriteProduct/createFavoriteProduct', createFavoriteSaga);
  yield takeEvery('favoriteProduct/deleteFavoriteProduct', deleteFavoriteSaga);
}

export default favoriteProductSaga;
