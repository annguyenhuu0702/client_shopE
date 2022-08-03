import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryParams } from '../../types/common';
import { typeCreateUser, typeUser } from '../../types/user';

export interface typeUserState {
  users: typeUsers;
  isLoading: boolean;
  isError: boolean;
  currentUser: typeUser | null;
}

export interface responseUser {
  data: typeUser;
  message?: string;
}

export interface typeUsers {
  data: {
    rows: typeUser[];
    count: number;
  };
  message?: string;
}

const initialState: typeUserState = {
  users: {
    data: {
      rows: [],
      count: 0,
    },
  },
  isLoading: false,
  isError: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getAllUser: (state, action: PayloadAction<QueryParams>) => {
      state.isLoading = true;
    },
    getAllUserSuccess: (state, action: PayloadAction<typeUsers>) => {
      state.isLoading = false;
      state.isError = false;
      state.users = action.payload;
    },
    getAllUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createUser: (state, action: PayloadAction<typeCreateUser>) => {
      state.isLoading = true;
    },
    createUserSuccess: (state, action: PayloadAction<typeUser>) => {
      state.isLoading = false;
      state.isError = false;
      state.currentUser = action.payload;
    },
    createUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setUserEditing: (state, action: PayloadAction<typeUser | null>) => {
      state.currentUser = action.payload;
    },
    editUser: (state, action: PayloadAction<typeUser>) => {
      state.isLoading = true;
    },
    editUserSuccess: (state, action: PayloadAction<responseUser>) => {
      const index = state.users.data.rows.findIndex(
        (item) => item.id === action.payload.data.id
      );
      if (index !== -1) {
        state.users.data.rows[index] = action.payload.data;
      }
      state.isLoading = false;
      state.isError = false;
    },
    editUserFailed: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
