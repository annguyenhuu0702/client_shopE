import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetAllCategoryParams } from '../../types/category';
import { RootState } from '../store';

export interface commentState {
  comments: resComment;
  currentComment: any | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;

  // client
  commentsClient: resComment;
  currentCommentClient: any | null;
}

export interface resComment {
  rows: any;
  count: number;
}

const initialState: commentState = {
  // admin
  comments: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 9,
  currentComment: null,
  isLoading: false,
  isError: false,

  // client
  commentsClient: {
    rows: [],
    count: 0,
  },
  currentCommentClient: null,
};

const CommentSlice = createSlice({
  name: 'comment',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },

    getAllCommentByProduct: (
      state,
      action: PayloadAction<IGetAllCategoryParams>
    ) => {
      state.isLoading = true;
    },
    getAllCommentByProductSuccess: (
      state,
      action: PayloadAction<resComment>
    ) => {
      state.isLoading = false;
      state.isError = false;
      state.commentsClient.rows = action.payload.rows;
      state.commentsClient.count = action.payload.count;
    },
    getAllCommentByProductFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const commentActions = CommentSlice.actions;
export const commentSelector = (state: RootState) => state.category;

export default CommentSlice.reducer;
