import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { AppDispatch } from '../redux/store';
import {
  changeEmailDto,
  changePasswordDto,
  changeProfileDto,
  loginDto,
  registerDto,
} from '../types/auth';

const register = (user: registerDto): Promise<AxiosResponse> => {
  return instance.post(`${URL_API}/auth/register`, user);
};

const login = (user: loginDto): Promise<AxiosResponse> => {
  return instance.post(`${URL_API}/auth/login`, user);
};

export const logout = (): Promise<AxiosResponse> => {
  return instance.post(`${URL_API}/auth/logout`);
};

export const refreshToken = (): Promise<AxiosResponse> => {
  return instance.post(`${URL_API}/auth/refreshToken`);
};

export const getProfile = (
  token: string | null,
  dispatch: AppDispatch
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`${URL_API}/auth/getProfile`);
};

export const changeProfile = (
  token: string | null,
  dispatch: AppDispatch,
  data: changeProfileDto
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/auth/changeProfile`,
    data
  );
};

export const changePassword = (
  token: string | null,
  dispatch: AppDispatch,
  data: changePasswordDto
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/auth/changePassword`,
    data
  );
};

export const changeEmail = (
  token: string | null,
  dispatch: AppDispatch,
  data: changeEmailDto
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/auth/changeEmail`,
    data
  );
};

export const authApi = {
  register,
  login,
  logout,
  getProfile,
  refreshToken,
  changeProfile,
  changePassword,
  changeEmail,
};
