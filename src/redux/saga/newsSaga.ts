import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { newsApi } from '../../apis/newsApi';
import { routes } from '../../config/routes';
import { STATUS_CODE } from '../../constants';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  createNews,
  getAllNews,
  getAllNewsClient,
  updateNews,
} from '../../types/news';
import { newsActions } from '../slice/newsSlice';

function* getAllNewsSaga({ payload }: PayloadAction<getAllNews>): any {
  try {
    const { token, dispatch, params } = payload;
    const res = yield call(() => {
      return newsApi.getAll(token, dispatch, params);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(newsActions.getAllNewsSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(newsActions.getAllNewsFailed());
  }
}

function* getAllNewsClientSaga({
  payload,
}: PayloadAction<getAllNewsClient>): any {
  try {
    const res = yield call(() => {
      return newsApi.getAllNewsClient();
    });
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(newsActions.getAllNewsClientSuccess(data.data));
    }
  } catch (err) {
    console.log(err);
    yield put(newsActions.getAllNewsClientFailed());
  }
}

function* createNewsSaga({
  payload,
}: PayloadAction<tokenPayloadData<createNews>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return newsApi.create(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(newsActions.createNewsSuccess());
      navigate(routes.newsAdmin);
      notification.success({
        message: 'Thành công',
        description: 'Thêm thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(newsActions.createNewsFailed);
    notification.error({
      message: 'Thất bại',
      description: 'Có lỗi khi điền form dữ liệu',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* editNewsSaga({
  payload,
}: PayloadAction<tokenPayloadData<updateNews>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return newsApi.update(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(newsActions.editNewsSuccess());
      navigate(routes.newsAdmin);
      notification.success({
        message: 'Thành công',
        description: 'Sửa thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (err) {
    console.log(err);
    yield put(newsActions.editNewsFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* deleteNewsSaga({ payload }: PayloadAction<deleteParams>): any {
  try {
    const { token, dispatch, id, params } = payload;
    const res = yield call(() => {
      return newsApi.deleteNews(token, dispatch, id);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(newsActions.deleteNewsSuccess());
      yield put(
        newsActions.getAllNews({
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
    yield put(newsActions.deleteNewsFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
  }
}

function* newsSaga() {
  yield takeEvery('news/getAllNews', getAllNewsSaga);
  yield takeEvery('news/createNews', createNewsSaga);
  yield takeEvery('news/editNews', editNewsSaga);
  yield takeEvery('news/deleteNews', deleteNewsSaga);
  yield takeEvery('news/getAllNewsClient', getAllNewsClientSaga);
}

export default newsSaga;
