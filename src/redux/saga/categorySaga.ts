import { takeEvery } from 'redux-saga/effects';

function* fetchCategorySaga() : any {
  try {
    yield console.log("hello")   

  } catch (err) {
    console.log(err);
  }
}

function* categorySaga() {
  yield takeEvery('category/fetchCategory', fetchCategorySaga);
}

export default categorySaga;
