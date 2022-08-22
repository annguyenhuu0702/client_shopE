import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenPayload, tokenPayloadDelete } from '../../types/common';
import {
  getAllUserTokenPayload,
  typeCreateUser,
  typeUser,
} from '../../types/user';
import { RootState } from '../store';

export interface typeUserState {
  users: ResponseUsers;
  page: number;
  isLoading: boolean;
  isError: boolean;
  currentUser: typeUser | null;
}

export interface ResponseUsers {
  rows: typeUser[];
  count: number;
}

const initialState: typeUserState = {
  users: {
    rows: [],
    count: 0,
  },
  page: 1,
  isLoading: false,
  isError: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getAllUser: (state, action: PayloadAction<getAllUserTokenPayload>) => {
      state.isLoading = true;
    },
    getAllUserSuccess: (state, action: PayloadAction<ResponseUsers>) => {
      state.isLoading = false;
      state.isError = false;
      state.users.rows = action.payload.rows;
      state.users.count = action.payload.count;
    },
    getAllUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    createUser: (
      state,
      action: PayloadAction<tokenPayload<typeCreateUser>>
    ) => {
      state.isLoading = true;
    },
    createUserSuccess: (state, action: PayloadAction<typeUser>) => {
      state.isLoading = false;
      state.isError = false;
      state.currentUser = null;
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
    setUser: (state, action: PayloadAction<typeUser | null>) => {
      state.currentUser = action.payload;
    },
    editUser: (state, action: PayloadAction<tokenPayload<typeUser>>) => {
      state.isLoading = true;
    },
    editUserSuccess: (state, action: PayloadAction<typeUser>) => {
      state.currentUser = null;
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
    deleteUser: (state, action: PayloadAction<tokenPayloadDelete>) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state, action: PayloadAction<number>) => {
      state.isError = false;
      state.isLoading = false;
      state.currentUser = null;
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
