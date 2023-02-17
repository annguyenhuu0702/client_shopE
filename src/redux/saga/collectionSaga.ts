import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { collectionApi } from '../../apis/collectionApi';
import { STATUS_CODE } from '../../constants';
import {
  collection,
  createCollection,
  getAllCollectionParams,
} from '../../types/collection';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { collectionActions } from '../slice/collectionSlice';
import { routes } from '../../config/routes';

function* getAllCollectionSaga({
  payload,
}: PayloadAction<getAllCollectionParams>): any {
  try {
    const res = yield call(() => {
      return collectionApi.getAll(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(collectionActions.getAllCollectionSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(collectionActions.getAllCollectionFailed());
  }
}

function* createCollectionSaga({
  payload,
}: PayloadAction<tokenPayloadData<createCollection>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return collectionApi.create(token, dispatch, data);
    });
    const { data: newData, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(collectionActions.createCollectionSuccess(newData.data));
      if (data.resetValues) {
        data.resetValues();
      }
      navigate(routes.collectionAdmin);
      notification.success({
        message: 'Thành công',
        description: 'Thêm thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(collectionActions.createCollectionFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editCollectionSaga({
  payload,
}: PayloadAction<tokenPayloadData<collection>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return collectionApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(collectionActions.editCollectionSuccess(data));
      if (data.resetValues) {
        data.resetValues();
      }
      navigate(routes.collectionAdmin);
      notification.success({
        message: 'Thành công',
        description: 'Sửa thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(collectionActions.editCollectionFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteCollectionSaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return collectionApi.deleteCollection(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(collectionActions.deleteCollectionSuccess(id));
      yield put(
        collectionActions.getAllCollection({
          p: params?.p,
          limit: params?.limit,
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(collectionActions.deleteCollectionFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* categorySaga() {
  yield takeEvery('collection/createCollection', createCollectionSaga);
  yield takeEvery('collection/getAllCollection', getAllCollectionSaga);
  yield takeEvery('collection/editCollection', editCollectionSaga);
  yield takeEvery('collection/deleteCollection', deleteCollectionSaga);
}

export default categorySaga;
