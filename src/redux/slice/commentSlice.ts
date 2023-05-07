import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Comment,
  createComment,
  getCommentByProduct,
} from '../../types/comment';
import { RootState } from '../store';
import { tokenPayloadData } from '../../types/common';

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
  pageClient: number;
  pageSizeClient: number;
  isLoadingClient: boolean;
  isErrorClient: boolean;
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
  pageSize: 12,
  currentComment: null,
  isLoading: false,
  isError: false,

  // client
  commentsClient: {
    rows: [],
    count: 0,
  },
  currentCommentClient: null,
  pageClient: 1,
  pageSizeClient: 12,
  isLoadingClient: false,
  isErrorClient: false,
};

const CommentSlice = createSlice({
  name: 'comment',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.pageClient = action.payload.page;
      state.pageSizeClient = action.payload.pageSize;
    },

    getAllCommentByProduct: (
      state,
      action: PayloadAction<getCommentByProduct>
    ) => {
      state.isLoadingClient = true;
    },
    getAllCommentByProductSuccess: (
      state,
      action: PayloadAction<resComment>
    ) => {
      state.isLoadingClient = false;
      state.isErrorClient = false;
      state.commentsClient.rows = action.payload.rows;
      state.commentsClient.count = action.payload.count;
    },
    getAllCommentByProductFailed: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = true;
    },

    createCommentByUser: (
      state,
      action: PayloadAction<tokenPayloadData<createComment>>
    ) => {
      state.isLoadingClient = true;
    },
    createCommentByUserSuccess: (state, action: PayloadAction<Comment>) => {
      state.isLoadingClient = false;
      state.isErrorClient = false;
      // state.pageClient = 1;
      // state.commentsClient.rows.unshift(action.payload);
      // state.commentsClient.count += 1;
      // if (state.commentsClient.rows.length > 12) {
      //   state.commentsClient.rows.splice(
      //     state.commentsClient.rows.length - 1,
      //     1
      //   );
      // }
    },
    createCommentByUserFailed: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = true;
    },
  },
});

export const commentActions = CommentSlice.actions;
export const commentSelector = (state: RootState) => state.comment;

export default CommentSlice.reducer;
