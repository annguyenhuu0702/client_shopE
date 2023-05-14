import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { commentApi } from '../../apis/commentApi';
import { STATUS_CODE } from '../../constants';
import {
  createComment,
  deleteComment,
  getAllComment,
  getCommentByProduct,
  updateComment,
} from '../../types/comment';
import { commentActions } from '../slice/commentSlice';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { notification } from 'antd';
import { modalActions } from '../slice/modalSlice';

function* getAllCommentSaga({ payload }: PayloadAction<getAllComment>): any {
  try {
    const { token, dispatch, params } = payload;
    const res = yield call(() => {
      return commentApi.getAllComment(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(commentActions.getAllCommentSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(commentActions.getAllCommentFailed());
  }
}

function* deleteCommentSaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return commentApi.deleteComment(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(commentActions.deleteCommentSuccess());
      yield put(
        commentActions.getAllComment({
          token,
          dispatch,
          params: {
            p: params?.p,
            limit: params?.limit,
          },
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(commentActions.deleteCommentFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* getAllCommentByProductSaga({
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

function* createCommentByUserSaga({
  payload,
}: PayloadAction<tokenPayloadData<createComment>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return commentApi.addCommentByUser(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(commentActions.createCommentByUserSuccess());
      yield put(
        commentActions.getAllCommentByProduct({
          productId: data.productId,
          params: {
            p: data.p,
            limit: data.limit,
          },
        })
      );
      notification.success({
        message: 'Thành công',
        description: 'Thêm thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(commentActions.createCommentByUserFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editCommentByUserSaga({
  payload,
}: PayloadAction<tokenPayloadData<updateComment>>): any {
  try {
    const { token, dispatch, data } = payload;
    const res = yield call(() => {
      return commentApi.editCommentByUser(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(commentActions.editCommentByUserSuccess());
      yield put(
        commentActions.getAllCommentByProduct({
          productId: data.productId,
          params: {
            p: data.p,
            limit: data.limit,
          },
        })
      );
      yield put(modalActions.hideModal());
      notification.success({
        message: 'Thành công',
        description: 'Sửa thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(commentActions.createCommentByUserFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteCommentByUserSaga({
  payload,
}: PayloadAction<deleteComment>): any {
  try {
    const { token, dispatch, id, productId, params } = payload;
    const res = yield call(() => {
      return commentApi.deleteComment(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(commentActions.deleteCommentByUserSuccess());
      yield put(
        commentActions.getAllCommentByProduct({
          productId,
          params: {
            p: params?.p,
            limit: params?.limit,
          },
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(commentActions.deleteCommentByUserFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* newsSaga() {
  yield takeEvery('comment/getAllCommentByProduct', getAllCommentByProductSaga);
  yield takeEvery('comment/createCommentByUser', createCommentByUserSaga);
  yield takeEvery('comment/getAllComment', getAllCommentSaga);
  yield takeEvery('comment/deleteComment', deleteCommentSaga);
  yield takeEvery('comment/editCommentByUser', editCommentByUserSaga);
  yield takeEvery('comment/deleteCommentByUser', deleteCommentByUserSaga);
}

export default newsSaga;
