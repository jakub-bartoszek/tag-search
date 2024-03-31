import { call, put, takeLatest } from "redux-saga/effects";
import fetchTags from "./fetchTags";
import { fetchTagsFailure, fetchTagsSuccess } from "../redux/tagsSlice";

function* fetchTagsSagaHandler({ payload }) {
 try {
  const params = new URLSearchParams(payload);

  const tags: [] = yield call(fetchTags, params.toString());
  yield put(fetchTagsSuccess(tags));
 } catch (error: any) {
  yield put(fetchTagsFailure(error.message));
 }
}

export default function* tagsSaga() {
 yield takeLatest("tags/fetchTagsStart", fetchTagsSagaHandler);
}
