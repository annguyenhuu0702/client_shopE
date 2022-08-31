import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  changeEmailDto,
  changePasswordDto,
  changeProfileDto,
  loginDto,
  registerDto,
} from '../../types/auth';
import { tokenPayload } from '../../types/common';
import { user } from '../../types/user';
import { RootState } from '../store';

export interface authState {
  isLoading: boolean;
  isError: boolean;
  user: resUser;
}

export interface resUser {
  user: user | null;
  accessToken: string | null;
}

const initialState: authState = {
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
    register: (state, action: PayloadAction<registerDto>) => {
      state.isLoading = true;
      state.isError = false;
    },
    registerSuccess: (state, action: PayloadAction<resUser>) => {
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
    login: (state, action: PayloadAction<loginDto>) => {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess: (state, action: PayloadAction<resUser>) => {
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
    getProfile: (state, action: PayloadAction<user>) => {
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
      action: PayloadAction<tokenPayload<changeProfileDto>>
    ) => {
      state.isLoading = true;
    },
    changeProfileSuccess: (state, action: PayloadAction<changeProfileDto>) => {
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
      action: PayloadAction<tokenPayload<changePasswordDto>>
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
      action: PayloadAction<tokenPayload<changeEmailDto>>
    ) => {
      state.isLoading = true;
    },
    changeEmailSuccess: (state, action: PayloadAction<changeEmailDto>) => {
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
