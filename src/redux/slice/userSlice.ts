import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tokenPayload, tokenPayloadNoData } from '../../types/common';
import { typeCreateUser, typeUser } from '../../types/user';

export interface typeUserState {
  users: ResponseUsers;
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
  isLoading: false,
  isError: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getAllUser: (state, action: PayloadAction<tokenPayloadNoData>) => {
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
    createUser: (
      state,
      action: PayloadAction<tokenPayload<typeCreateUser>>
    ) => {
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
    setUser: (state, action: PayloadAction<typeUser | null>) => {
      state.currentUser = action.payload;
    },
    editUser: (state, action: PayloadAction<tokenPayload<typeUser>>) => {
      state.isLoading = true;
    },
    editUserSuccess: (state, action: PayloadAction<typeUser>) => {
      const index = state.users.rows.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.users.rows[index] = action.payload;
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
