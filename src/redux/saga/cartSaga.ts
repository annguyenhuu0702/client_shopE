import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { cartApi } from '../../apis/cartApi';
import { cartItemApi } from '../../apis/cartItemApi';
import { STATUS_CODE } from '../../constants';
import { createCartItem } from '../../types/cartItem';
import { tokenPayload, tokenPayloadData } from '../../types/common';
import { cartActions } from '../slice/cartSlice';

function* getCartByUserSaga({ payload }: PayloadAction<tokenPayload>): any {
  try {
    const { token, dispatch } = payload;

    const res = yield call(() => {
      return cartApi.getByUser(token, dispatch);
    });
    const { data, status } = res;
    console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(cartActions.getByUserSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(cartActions.getByUserFailed());
  }
}

function* addToCartSaga({
  payload,
}: PayloadAction<tokenPayloadData<createCartItem>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return cartItemApi.addToCart(token, dispatch, data);
    });
    const { data: newData, status } = res;
    console.log(newData);
    if (status === STATUS_CODE.CREATED) {
      yield put(cartActions.addToCartSuccess(newData.data));
    }
  } catch (err) {
    console.log(err);
    yield put(cartActions.addToCartFailed());
  }
}

function* cartSaga() {
  yield takeEvery('cart/getByUser', getCartByUserSaga);
  yield takeEvery('cart/addToCart', addToCartSaga);
}

export default cartSaga;
