import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { getAllDiscount } from '../../types/discount';
import { createNews, getAllNews, News, updateNews } from '../../types/news';
import { RootState } from '../store';

export interface NewsState {
  news: resNews;
  currentNews: News | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
}

export interface resNews {
  rows: News[];
  count: number;
}

const initialState: NewsState = {
  news: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 9,
  currentNews: null,
  isLoading: false,
  isError: false,
};

const NewsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setNews: (state, action: PayloadAction<News | null>) => {
      state.currentNews = action.payload;
    },
    getAllNews: (state, action: PayloadAction<getAllNews>) => {
      state.isLoading = true;
      state.isError = false;
    },
    getAllNewsSuccess: (state, action: PayloadAction<resNews>) => {
      state.isLoading = false;
      state.isError = false;
      state.news.rows = action.payload.rows;
      state.news.count = action.payload.count;
    },
    getAllNewsFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createNews: (
      state,
      action: PayloadAction<tokenPayloadData<createNews>>
    ) => {
      state.isLoading = true;
      state.isError = false;
    },
    createNewsSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    createNewsFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    editNews: (state, action: PayloadAction<tokenPayloadData<updateNews>>) => {
      state.isLoading = true;
    },
    editNewsSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    editNewsFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteNews: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteNewsSuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    deleteNewsFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const newsActions = NewsSlice.actions;
export const newsSelector = (state: RootState) => state.news;

export default NewsSlice.reducer;
