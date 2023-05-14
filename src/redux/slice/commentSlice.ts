import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Comment,
  createComment,
  deleteComment,
  getAllComment,
  getCommentByProduct,
  updateComment,
} from '../../types/comment';
import { RootState } from '../store';
import { deleteParams, tokenPayloadData } from '../../types/common';

export interface commentState {
  comments: resComment;
  currentComment: Comment | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;

  // client
  commentsClient: resComment;
  currentCommentClient: Comment | null;
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

    setComment: (state, action: PayloadAction<Comment | null>) => {
      state.currentComment = action.payload;
    },

    getAllComment: (state, action: PayloadAction<getAllComment>) => {
      state.isLoading = true;
    },
    getAllCommentSuccess: (state, action: PayloadAction<resComment>) => {
      state.isLoading = false;
      state.isError = false;
      state.comments.rows = action.payload.rows;
      state.comments.count = action.payload.count;
    },
    getAllCommentFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    deleteComment: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteCommentSuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    deleteCommentFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
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
    createCommentByUserSuccess: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = false;
    },
    createCommentByUserFailed: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = true;
    },

    editCommentByUser: (
      state,
      action: PayloadAction<tokenPayloadData<updateComment>>
    ) => {
      state.isLoadingClient = true;
    },
    editCommentByUserSuccess: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = false;
    },
    editCommentByUserFailed: (state) => {
      state.isLoadingClient = false;
      state.isErrorClient = true;
    },

    deleteCommentByUser: (state, action: PayloadAction<deleteComment>) => {
      state.isLoading = true;
    },
    deleteCommentByUserSuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    deleteCommentByUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const commentActions = CommentSlice.actions;
export const commentSelector = (state: RootState) => state.comment;

export default CommentSlice.reducer;
