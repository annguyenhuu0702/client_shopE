import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import categoryReducer from './slice/categorySlice';
import userReducer from './slice/userSlice';
import modalReducer from './slice/modalSlice';
import rootSaga from './rootSaga';
import authReducer from './slice/authSlice';
import categoryTypeReducer from './slice/categoryTypeSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    modal: modalReducer,
    categoryType: categoryTypeReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
