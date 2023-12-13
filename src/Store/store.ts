// import { createStore, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import logger from "redux-logger";
// import { rootSaga } from "./sagas/rootSagas";
// import rootReducer from "./rootReducers";

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// sagaMiddleware.run(rootSaga);

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { rootSaga } from "./sagas/rootSagas";
import rootReducer from "./rootReducers";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export default store;
