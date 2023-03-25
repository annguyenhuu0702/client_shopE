import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import userReducer from './slice/userSlice';
import modalReducer from './slice/modalSlice';
import authReducer from './slice/authSlice';
import categoryReducer from './slice/categorySlice';
import collectionReducer from './slice/collectionSlice';
import productCategoryReducer from './slice/productCategorySlice';
import productReducer from './slice/productSlice';
import productImageReducer from './slice/productImageSlice';
import productVariantReducer from './slice/productVariantSlice';
import cartReducer from './slice/cartSlice';
import favoriteProductReducer from './slice/favoriteProductSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    user: userReducer,
    category: categoryReducer,
    collection: collectionReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    productImage: productImageReducer,
    productVariant: productVariantReducer,
    favoriteProduct: favoriteProductReducer,
    cart: cartReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
