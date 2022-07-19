import { call, put, takeEvery } from 'redux-saga/effects';
import { categoryApi } from '../../apis/categoryApi';
import { STATUS_CODE } from '../../constants';
import { categoryActions } from '../slice/categorySlice';

function* fetchCategorySaga() : any {
  try {
    const res = yield call(categoryApi.getAllCategory);
    const { data, status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(categoryActions.fetchCategorySuccess(data));
    }
  } catch (err) {
    yield put(categoryActions.fetchCategoryFailed())
    console.log(err);
  }
}

function* categorySaga() {
  yield takeEvery('category/fetchCategory', fetchCategorySaga);
}

export default categorySaga;
