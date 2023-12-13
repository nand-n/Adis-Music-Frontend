import { all, fork } from "redux-saga/effects";
import songsSaga from "../Songs/songSagas";

export function* rootSaga() {
  yield all([fork(songsSaga)]);
}
