import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  collection,
  createCollection,
  getAllCollectionParams,
  updateCollection,
} from '../../types/collection';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { RootState } from '../store';

export interface collectionState {
  collections: resCollection;
  currentCollection: collection | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  currentCollectionClient: collection | null;
}

export interface resCollection {
  rows: collection[];
  count: number;
}

const initialState: collectionState = {
  // admin
  collections: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 7,
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
    setCollection: (state, action: PayloadAction<collection | null>) => {
      state.currentCollection = action.payload;
    },
    getAllCollection: (
      state,
      action: PayloadAction<getAllCollectionParams>
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
      action: PayloadAction<tokenPayloadData<createCollection>>
    ) => {
      state.isLoading = true;
    },
    createCollectionSuccess: (state, action: PayloadAction<collection>) => {
      state.isLoading = false;
      state.isError = false;
      state.collections.rows.unshift(action.payload);
      state.collections.count += 1;
      state.page = 1;
      if (state.collections.rows.length > 7) {
        state.collections.rows.splice(state.collections.rows.length - 1, 1);
      }
    },
    createCollectionFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editCollection: (
      state,
      action: PayloadAction<tokenPayloadData<updateCollection>>
    ) => {
      state.isLoading = true;
    },
    editCollectionSuccess: (state, action: PayloadAction<collection>) => {
      state.isLoading = false;
      state.isError = false;
      const index = state.collections.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.collections.rows[index] = action.payload;
      }
    },
    editCollectionFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    deleteCollection: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteCollectionSuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.collections.rows = state.collections.rows.filter(
        (item) => item.id !== action.payload
      );
      state.collections.count -= 1;
      if (state.collections.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteCollectionFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    getCollectionBySlugClient: (
      state,
      action: PayloadAction<getAllCollectionParams>
    ) => {
      state.isLoading = true;
    },
    getCollectionBySlugClientSuccess: (
      state,
      action: PayloadAction<collection>
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
