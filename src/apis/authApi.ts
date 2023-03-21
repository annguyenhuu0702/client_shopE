import { AxiosResponse } from 'axios';
import instance, { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';
import {
  changeEmailDto,
  changePasswordDto,
  changeProfileDto,
  loginDto,
  registerDto,
} from '../types/auth';

const register = (user: registerDto): Promise<AxiosResponse> => {
  return instance.post(`auth/register`, user);
};

const login = (user: loginDto): Promise<AxiosResponse> => {
  return instance.post(`auth/login`, user);
};

const logout = (): Promise<AxiosResponse> => {
  return instance.post(`auth/logout`);
};

const refreshToken = (): Promise<AxiosResponse> => {
  return instance.post(`auth/refreshToken`);
};

const getProfile = (
  token: string | null,
  dispatch: AppDispatch
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`auth/getProfile`);
};

const changeProfile = (
  token: string | null,
  dispatch: AppDispatch,
  data: changeProfileDto
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(`auth/changeProfile`, data);
};

const changePassword = (
  token: string | null,
  dispatch: AppDispatch,
  data: changePasswordDto
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(`auth/changePassword`, data);
};

const changeEmail = (
  token: string | null,
  dispatch: AppDispatch,
  data: changeEmailDto
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).put(`auth/changeEmail`, data);
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
