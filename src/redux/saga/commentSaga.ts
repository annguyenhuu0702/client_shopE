import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { commentApi } from '../../apis/commentApi';
import { STATUS_CODE } from '../../constants';
import { getCommentByProduct } from '../../types/comment';
import { commentActions } from '../slice/commentSlice';

function* getAllCommentByProduct({
  payload,
}: PayloadAction<getCommentByProduct>): any {
  try {
    const { params, productId } = payload;
    const res = yield call(() => {
      return commentApi.getAllByProduct(productId, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(commentActions.getAllCommentByProductSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(commentActions.getAllCommentByProductFailed());
  }
}

function* newsSaga() {
  yield takeEvery('comment/getAllCommentByProduct', getAllCommentByProduct);
}

export default newsSaga;
