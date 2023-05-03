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
import variantValueReducer from './slice/variantValueSlice';
import cartReducer from './slice/cartSlice';
import favoriteProductReducer from './slice/favoriteProductSlice';
import discountReducer from './slice/discountSlice';
import newsReducer from './slice/newsSlice';
import commentReducer from './slice/commentSlice';
import paymentReducer from './slice/paymentSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    collection: collectionReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    productImage: productImageReducer,
    productVariant: productVariantReducer,
    variantValue: variantValueReducer,
    favoriteProduct: favoriteProductReducer,
    cart: cartReducer,
    discount: discountReducer,
    news: newsReducer,
    comment: commentReducer,
    payment: paymentReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
