import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IPost } from "../../models/IPost";
import { fetchPostsFailure, fetchPostsSuccess } from "../../actions/postsActions/postsAction";
import { postTypes } from "../../actionTypes/postsTypes";
import { URL_BASE } from "../../../Constants";

const getPosts = () => axios.get<IPost[]>(`${URL_BASE}song`);

function* fetchPostsSaga() {
  try {
    const response = yield call(getPosts);
    yield put(
      fetchPostsSuccess({
        posts: response.data
      })
    );
  } catch (e) {
    yield put(
      fetchPostsFailure({
        error: e.message
      })
    );
  }
}

function* postsSaga() {
  yield all([takeLatest(postTypes.FETCH_POST_REQUEST, fetchPostsSaga)]);
}

export default postsSaga;
