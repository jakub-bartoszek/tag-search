import { call, put, takeLatest } from "redux-saga/effects";
import fetchTags from "./fetchTags";
import { fetchTagsFailure, fetchTagsSuccess, setHasMorePages } from "../redux/tagsSlice";
import { PayloadAction } from "@reduxjs/toolkit";

type ResponseData = {
 items: Array<any>;
 has_more: boolean;
 quota_max: number;
 quota_remaining: number;
};

function* fetchTagsSagaHandler({
 payload
}: PayloadAction<{ ageSize: string; order: string; inName: string; page: string }>) {
 try {
  const params = new URLSearchParams(payload);

  const data: ResponseData = yield call(fetchTags, params.toString());
  const tags = data.items;
  yield put(fetchTagsSuccess(tags));
  yield put(setHasMorePages(data.has_more));
 } catch (error: any) {
  yield put(fetchTagsFailure(error.message));
 }
}

export default function* tagsSaga() {
 yield takeLatest("tags/fetchTagsStart", fetchTagsSagaHandler);
}
