import { all } from "redux-saga/effects"
import authSaga from "./saga/authSaga";
import categorySaga from "./saga/categorySaga";

function* rootSaga() {
  yield all([
    categorySaga(),
    authSaga()
  ]);
}

export default rootSaga