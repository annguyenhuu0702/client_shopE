import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ICollection,
  ICreateCollection,
  IGetAllCollectionParams,
  IUpdateCollection,
} from '../../types/collection';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { RootState } from '../store';

export interface collectionState {
  collections: resCollection;
  currentCollection: ICollection | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  currentCollectionClient: ICollection | null;
}

export interface resCollection {
  rows: ICollection[];
  count: number;
}

const initialState: collectionState = {
  // admin
  collections: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 12,
  currentCollection: null,
  isLoading: false,
  isError: false,
  // client
  currentCollectionClient: null,
};

const CollectionSlice = createSlice({
  name: 'collection',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setCollection: (state, action: PayloadAction<ICollection | null>) => {
      state.currentCollection = action.payload;
    },
    setCollectionClient: (state, action: PayloadAction<ICollection | null>) => {
      state.currentCollectionClient = action.payload;
    },
    getAllCollection: (
      state,
      action: PayloadAction<IGetAllCollectionParams>
    ) => {
      state.isLoading = true;
    },
    getAllCollectionSuccess: (state, action: PayloadAction<resCollection>) => {
      state.isLoading = false;
      state.isError = false;
      state.collections.rows = action.payload.rows;
      state.collections.count = action.payload.count;
    },
    getAllCollectionFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    createCollection: (
      state,
      action: PayloadAction<tokenPayloadData<ICreateCollection>>
    ) => {
      state.isLoading = true;
    },
    createCollectionSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    createCollectionFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editCollection: (
      state,
      action: PayloadAction<tokenPayloadData<IUpdateCollection>>
    ) => {
      state.isLoading = true;
    },
    editCollectionSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    editCollectionFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteCollection: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteCollectionSuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    deleteCollectionFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    getCollectionBySlugClient: (
      state,
      action: PayloadAction<IGetAllCollectionParams>
    ) => {
      state.isLoading = true;
    },
    getCollectionBySlugClientSuccess: (
      state,
      action: PayloadAction<ICollection>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.currentCollectionClient = action.payload;
    },
    getCollectionBySlugClientFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const collectionActions = CollectionSlice.actions;
export const collectionSelector = (state: RootState) => state.collection;

export default CollectionSlice.reducer;
