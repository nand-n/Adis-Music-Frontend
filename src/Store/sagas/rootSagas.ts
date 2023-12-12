import { all, fork } from "redux-saga/effects";
import postsSaga from "./postSaga/postSaga";
import songsSaga from "../Songs/songSagas";

export function* rootSaga() {
  yield all([fork(postsSaga), fork(songsSaga)]);
}
