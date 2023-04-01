import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  changeEmailDto,
  changePasswordDto,
  changeProfileDto,
  loginDto,
  registerDto,
  IFogotPassword,
} from '../../types/auth';
import { tokenPayloadData } from '../../types/common';
import { IUser } from '../../types/user';
import { RootState } from '../store';

export interface authState {
  isLoading: boolean;
  isError: boolean;
  user: resUser;
}

export interface resUser {
  user: IUser | null;
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
    fogotPassword: (state, action: PayloadAction<IFogotPassword>) => {
      state.isLoading = true;
      state.isError = false;
    },
    fogotPasswordSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    fogotPasswordFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    getProfile: (state, action: PayloadAction<IUser>) => {
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
      action: PayloadAction<tokenPayloadData<changeProfileDto>>
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
      action: PayloadAction<tokenPayloadData<changePasswordDto>>
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
      action: PayloadAction<tokenPayloadData<changeEmailDto>>
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
    changeProfileClient: (
      state,
      action: PayloadAction<tokenPayloadData<changeProfileDto>>
    ) => {
      state.isLoading = true;
    },
    changeProfileClientSuccess: (
      state,
      action: PayloadAction<changeProfileDto>
    ) => {
      state.isLoading = false;
      state.isError = false;
      if (state.user.user) {
        state.user.user = {
          ...state.user.user,
          ...action.payload,
        };
      }
    },
    changeProfileClientFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    changePasswordUser: (
      state,
      action: PayloadAction<tokenPayloadData<changePasswordDto>>
    ) => {
      state.isLoading = true;
    },
    changePasswordUserSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    changePasswordUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const authActions = authSlice.actions;
export const authSelector = (state: RootState): authState => state.auth;

export default authSlice.reducer;
