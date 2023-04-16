import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteParams, tokenPayloadData } from '../../types/common';
import { ICreateUser, IGetAllUser, IUpdateUser, IUser } from '../../types/user';
import { RootState } from '../store';

export interface userState {
  users: resUser;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  currentUser: IUser | null;
}

export interface resUser {
  rows: IUser[];
  count: number;
}

const initialState: userState = {
  users: {
    rows: [],
    count: 0,
  },
  page: 1,
  pageSize: 9,
  isLoading: false,
  isError: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getAllUser: (state, action: PayloadAction<IGetAllUser>) => {
      state.isLoading = true;
    },
    getAllUserSuccess: (state, action: PayloadAction<resUser>) => {
      state.isLoading = false;
      state.isError = false;
      state.users.rows = action.payload.rows;
      state.users.count = action.payload.count;
    },
    getAllUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setPage: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    createUser: (
      state,
      action: PayloadAction<tokenPayloadData<ICreateUser>>
    ) => {
      state.isLoading = true;
    },
    createUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.isError = false;
      state.page = 1;
      state.users.rows.unshift(action.payload);
      state.users.count += 1;
      if (state.users.rows.length > 7) {
        state.users.rows.splice(state.users.rows.length - 1, 1);
      }
    },
    createUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.currentUser = action.payload;
    },
    editUser: (state, action: PayloadAction<tokenPayloadData<IUpdateUser>>) => {
      state.isLoading = true;
    },
    editUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.isError = false;
      const index = state.users.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.users.rows[index] = action.payload;
      }
    },
    editUserFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    deleteUser: (state, action: PayloadAction<deleteParams>) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.users.rows = state.users.rows.filter(
        (item) => item.id !== action.payload
      );
      state.users.count -= 1;
      if (state.users.rows.length === 0) {
        state.page = state.page - 1;
      }
    },
    deleteUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const userActions = userSlice.actions;
export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
