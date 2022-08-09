import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { typeChangProfile, typeLogin, typeRegister } from '../../types/auth';
import { tokenPayload } from '../../types/common';
import { typeUser } from '../../types/user';

export interface typeAuthState {
  isLoading: boolean;
  isError: boolean;
  currentUser: typeUserResponse;
}

export interface typeUserResponse {
  user: typeUser | null;
  accessToken: string;
}

const initialState: typeAuthState = {
  isLoading: false,
  isError: false,
  currentUser: {
    user: null,
    accessToken: JSON.parse(localStorage.getItem('mickey:AT') || 'null'),
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    register: (state, action: PayloadAction<typeRegister>) => {
      state.isLoading = true;
      state.isError = false;
    },
    registerSuccess: (state, action: PayloadAction<typeUserResponse>) => {
      state.isLoading = false;
      state.isError = false;
      state.currentUser.user = action.payload.user;
      state.currentUser.accessToken = action.payload.accessToken;
      localStorage.setItem(
        'mickey:AT',
        JSON.stringify(state.currentUser.accessToken)
      );
    },
    registerFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    login: (state, action: PayloadAction<typeLogin>) => {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess: (state, action: PayloadAction<typeUserResponse>) => {
      state.isLoading = false;
      state.isError = false;
      state.currentUser.user = action.payload.user;
      state.currentUser.accessToken = action.payload.accessToken;
      localStorage.setItem(
        'mickey:AT',
        JSON.stringify(state.currentUser.accessToken)
      );
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    logoutSuccess: (state) => {
      state.currentUser.user = null;
      state.currentUser.accessToken = '';
      localStorage.removeItem('mickey:AT');
    },
    getProfile: (state, action: PayloadAction<typeUser>) => {
      state.isError = false;
      state.isLoading = false;
      state.currentUser.user = action.payload;
    },
    getNewAccessToken: (state, action: PayloadAction<string>) => {
      state.currentUser.accessToken = action.payload;
      localStorage.setItem(
        'mickey:AT',
        JSON.stringify(state.currentUser.accessToken)
      );
    },
    changeProfile: (
      state,
      action: PayloadAction<tokenPayload<typeChangProfile>>
    ) => {
      state.isLoading = true;
    },
    changeProfileSuccess: (state, action: PayloadAction<typeChangProfile>) => {
      state.isLoading = false;
      state.isError = false;
      if (state.currentUser.user) {
        state.currentUser.user = {
          ...state.currentUser.user,
          ...action.payload,
        };
      }
    },
    changeProfileFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
