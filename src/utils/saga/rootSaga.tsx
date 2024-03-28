import { all } from "redux-saga/effects";

import  tagsSaga  from "./tagsSaga";

export default function* rootSaga() {
 yield all([tagsSaga()]);
}
