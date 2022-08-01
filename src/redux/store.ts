import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import categoryReducer from './slice/categorySlice';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import modalReducer from './slice/modalSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    modal: modalReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
