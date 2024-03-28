import { call, put, takeLatest } from "redux-saga/effects";
import fetchTags from "./fetchTags";
import { fetchTagsFailure, fetchTagsSuccess } from "../redux/tagsSlice";

function* fetchTagsSagaHandler() {
 try {
  const tags = yield call(fetchTags);
  yield put(fetchTagsSuccess([]));
 } catch (error) {
  yield put(fetchTagsFailure(error.message));
 }
}

export default function* tagsSaga() {
 yield takeLatest("tags/fetchTagsStart", fetchTagsSagaHandler);
}
