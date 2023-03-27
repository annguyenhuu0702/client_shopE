import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { cartApi } from '../../apis/cartApi';
import { cartItemApi } from '../../apis/cartItemApi';
import { routes } from '../../config/routes';
import { STATUS_CODE } from '../../constants';
import {
  CartItem,
  createCartItem,
  deleteCartItem,
  updateCartItem,
} from '../../types/cartItem';
import { tokenPayload, tokenPayloadData } from '../../types/common';
import { cartActions } from '../slice/cartSlice';

function* getCartByUserSaga({ payload }: PayloadAction<tokenPayload>): any {
  try {
    const { token, dispatch } = payload;

    const res = yield call(() => {
      return cartApi.getByUser(token, dispatch);
    });
    const { data, status } = res;
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
    const { token, dispatch, navigate, data } = payload;
    const res = yield call(() => {
      return cartItemApi.addToCart(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(cartActions.addToCartSuccess());
      notification.success({
        message: 'Thành công',
        description: 'Thêm vào giỏ hàng thành công',
        placement: 'bottomRight',
        duration: 3,
      });
      navigate(routes.cart);
    }
  } catch (err) {
    console.log(err);
    yield put(cartActions.addToCartFailed());
  }
}

function* updateCartSaga({
  payload,
}: PayloadAction<tokenPayloadData<CartItem>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return cartItemApi.updateCart(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(cartActions.updateCartSuccess(data));
      notification.success({
        message: 'Thành công',
        description: 'Cập nhật giỏ hàng thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(cartActions.updateCartFailed());
  }
}

function* deleteCartSaga({ payload }: PayloadAction<deleteCartItem>): any {
  try {
    const { token, dispatch, id } = payload;
    const res = yield call(() => {
      return cartItemApi.deleteCart(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(cartActions.deleteCartSuccess(id));
      notification.success({
        message: 'Thành công',
        description: 'Xóa thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(cartActions.deleteCartFailed());
  }
}

function* cartSaga() {
  yield takeEvery('cart/getByUser', getCartByUserSaga);
  yield takeEvery('cart/addToCart', addToCartSaga);
  yield takeEvery('cart/updateCart', updateCartSaga);
  yield takeEvery('cart/deleteCart', deleteCartSaga);
}

export default cartSaga;
