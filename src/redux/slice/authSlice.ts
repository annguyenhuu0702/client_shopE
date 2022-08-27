import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  typeChangeEmail,
  typeChangePassword,
  typeChangeProfile,
  typeLogin,
  typeRegister,
} from '../../types/auth';
import { tokenPayload } from '../../types/common';
import { typeUser } from '../../types/user';
import { RootState } from '../store';

export interface typeAuthState {
  isLoading: boolean;
  isError: boolean;
  user: typeUserResponse;
}

export interface typeUserResponse {
  user: typeUser | null;
  accessToken: string | null;
}

const initialState: typeAuthState = {
  isLoading: false,
  isError: false,
  user: {
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
      state.user.user = action.payload.user;
      state.user.accessToken = action.payload.accessToken;
      localStorage.setItem('mickey:AT', JSON.stringify(state.user.accessToken));
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
      state.user.user = action.payload.user;
      state.user.accessToken = action.payload.accessToken;
      localStorage.setItem('mickey:AT', JSON.stringify(state.user.accessToken));
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    logoutSuccess: (state) => {
      state.user.user = null;
      state.user.accessToken = '';
      localStorage.removeItem('mickey:AT');
    },
    getProfile: (state, action: PayloadAction<typeUser>) => {
      state.isError = false;
      state.isLoading = false;
      state.user.user = action.payload;
    },
    getNewAccessToken: (state, action: PayloadAction<string>) => {
      state.user.accessToken = action.payload;
      localStorage.setItem('mickey:AT', JSON.stringify(state.user.accessToken));
    },
    changeProfile: (
      state,
      action: PayloadAction<tokenPayload<typeChangeProfile>>
    ) => {
      state.isLoading = true;
    },
    changeProfileSuccess: (state, action: PayloadAction<typeChangeProfile>) => {
      state.isLoading = false;
      state.isError = false;
      if (state.user.user) {
        state.user.user = {
          ...state.user.user,
          ...action.payload,
        };
      }
    },
    changeProfileFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    changePassword: (
      state,
      action: PayloadAction<tokenPayload<typeChangePassword>>
    ) => {
      state.isLoading = true;
    },
    changePasswordSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    changePasswordFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    changeEmail: (
      state,
      action: PayloadAction<tokenPayload<typeChangeEmail>>
    ) => {
      state.isLoading = true;
    },
    changeEmailSuccess: (state, action: PayloadAction<typeChangeEmail>) => {
      if (state.user.user) {
        state.user.user = {
          ...state.user.user,
          ...action.payload,
        };
      }
      state.isLoading = false;
      state.isError = false;
    },
    changeEmailFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const authActions = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
