import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryParams } from '../../types/common';
import { typeCreateUser, typeUser } from '../../types/user';

export interface typeUserState {
  users: typeUser[];
  isLoading: boolean;
  isError: boolean;
  currentUser: typeUser | null;
}

const initialState: typeUserState = {
  users: [],
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
    getAllUserSuccess: (state, action: PayloadAction<typeUser[]>) => {
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
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
