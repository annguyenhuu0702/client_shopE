import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { favoriteProductApi } from '../../apis/favoriteProductApi';
import { STATUS_CODE } from '../../constants';
import { tokenPayload } from '../../types/common';
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

function* favoriteProductSaga() {
  yield takeEvery(
    'favoriteProduct/getFavoriteProductByUser',
    getFavoriteProductByUserSaga
  );
}

export default favoriteProductSaga;
