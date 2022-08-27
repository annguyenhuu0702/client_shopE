import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import {
  changeEmailDto,
  changePasswordDto,
  changeProfileDto,
  loginDto,
  registerDto,
} from '../types/auth';

const register = (user: registerDto) => {
  return instance.post(`${URL_API}/auth/register`, user);
};

const login = (user: loginDto) => {
  return instance.post(`${URL_API}/auth/login`, user);
};

export const logout = () => {
  return instance.post(`${URL_API}/auth/logout`);
};

export const refreshToken = () => {
  return instance.post(`${URL_API}/auth/refreshToken`);
};

export const getProfile = (token: string | null, dispatch: any) => {
  return apiCallerWithToken(token, dispatch).get(`${URL_API}/auth/getProfile`);
};

export const changeProfile = (
  token: string | null,
  dispatch: any,
  data: changeProfileDto
) => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/auth/changeProfile`,
    data
  );
};

export const changePassword = (
  token: string | null,
  dispatch: any,
  data: changePasswordDto
) => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/auth/changePassword`,
    data
  );
};

export const changeEmail = (
  token: string | null,
  dispatch: any,
  data: changeEmailDto
) => {
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
