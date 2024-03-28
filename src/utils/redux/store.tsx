import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from "./tagsSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: {
    tags: tagsReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleWare
  ]
});

sagaMiddleWare.run(rootSaga);

export default store;
