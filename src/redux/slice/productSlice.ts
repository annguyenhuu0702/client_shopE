import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import {
  IProduct,
  ICreateProduct,
  IUpdateProduct,
  IGetAllProductParams,
  IGetAllProductByCategory,
  IGetProductBySlug,
} from '../../types/product';
import { IProductCategory } from '../../types/productCategory';

import { RootState } from '../store';

export interface IProductByCategory {
  products: IProduct[];
  productCategory: IProductCategory | null;
}

export interface resProductByCategory {
  rows: IProductByCategory[];
  count: number;
}

export interface resProduct {
  rows: IProduct[];
  count: number;
}

export interface productState {
  products: resProduct;
  currentProduct: IProduct | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;

  // client
  productsClient: resProduct;
  productsRelatedClient: IProduct[];
  currentProductClient: IProduct | null;
  pageClient: number;
  pageSizeClient: number;
  isLoadingClient: boolean;
  isErrorClient: boolean;
  productsByCategory: resProductByCategory;
}

const initialState: productState = {
  products: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 9,
  currentProduct: null,
  isLoading: false,
  isError: false,
  // client
  productsClient: {
    rows: [],
    count: 0,
  },
  productsRelatedClient: [],
  currentProductClient: null,
  pageClient: 1,
  pageSizeClient: 12,
  isLoadingClient: false,
  isErrorClient: false,
  productsByCategory: {
    rows: [{ productCategory: null, products: [] }],
    count: 0,
  },
};

const ProductSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setProduct: (state, action: PayloadAction<IProduct | null>) => {
      state.currentProduct = action.payload;
    },
    getAllProduct: (state, action: PayloadAction<IGetAllProductParams>) => {
      state.isLoading = true;
    },
    getAllProductSuccess: (state, action: PayloadAction<resProduct>) => {
      state.isLoading = false;
      state.isError = false;
      state.products.rows = action.payload.rows;
      state.products.count = action.payload.count;
    },
    getAllProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createProduct: (
      state,
      action: PayloadAction<tokenPayloadData<ICreateProduct>>
    ) => {
      state.isLoading = true;
    },
    createProductSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    createProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editProduct: (
      state,
      action: PayloadAction<tokenPayloadData<IUpdateProduct>>
    ) => {
      state.isLoading = true;
    },
    editProductSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    editProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteProduct: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteProductSuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    deleteProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    updateThumbnail: (
      state,
      { payload }: PayloadAction<{ id: number; thumbnail: string }>
    ) => {
      const { id, thumbnail } = payload;
      const index = state.products.rows.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.products.rows[index].thumbnail = thumbnail;
        if (state.currentProduct) {
          state.currentProduct.thumbnail = thumbnail;
        }
      }
    },
    getAllProductClient: (
      state,
      action: PayloadAction<IGetAllProductParams>
    ) => {
      state.isLoadingClient = true;
    },
    getAllProductClientSuccess: (state, action: PayloadAction<resProduct>) => {
      state.isLoadingClient = false;
      state.isErrorClient = false;
      state.productsClient.rows = action.payload.rows;
      state.productsClient.count = action.payload.count;
    },
    getAllProductClientFailed: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = true;
    },
    setPageClient: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.pageClient = action.payload.page;
      state.pageSizeClient = action.payload.pageSize;
    },
    getAllProductByCategoryClient: (
      state,
      action: PayloadAction<IGetAllProductByCategory>
    ) => {
      state.isLoadingClient = true;
    },
    getAllProductByCategoryClientSuccess: (
      state,
      action: PayloadAction<resProductByCategory>
    ) => {
      state.isLoadingClient = false;
      state.isErrorClient = false;
      state.productsByCategory.rows = action.payload.rows;
      state.productsByCategory.count = action.payload.count;
    },
    getAllProductByCategoryClientFailed: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = true;
    },
    getProductBySlugClient: (
      state,
      action: PayloadAction<IGetProductBySlug>
    ) => {
      state.isLoadingClient = true;
    },
    getProductBySlugClientSuccess: (
      state,
      action: PayloadAction<{ product: IProduct; productsRelated: IProduct[] }>
    ) => {
      state.isLoadingClient = false;
      state.isErrorClient = false;
      state.currentProductClient = action.payload.product;
      state.productsRelatedClient = action.payload.productsRelated;
    },
    getProductBySlugClientFailed: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = true;
    },
  },
});

export const productActions = ProductSlice.actions;
export const productSelector = (state: RootState) => state.product;

export default ProductSlice.reducer;
