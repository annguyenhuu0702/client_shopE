import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import {
  typeChangeEmail,
  typeChangePassword,
  typeChangeProfile,
  typeLogin,
  typeRegister,
} from '../types/auth';

const register = (user: typeRegister) => {
  return instance.post(`${URL_API}/auth/register`, user);
};

const login = (user: typeLogin) => {
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
  data: typeChangeProfile
) => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/auth/changeProfile`,
    data
  );
};

export const changePassword = (
  token: string | null,
  dispatch: any,
  data: typeChangePassword
) => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/auth/changePassword`,
    data
  );
};

export const changeEmail = (
  token: string | null,
  dispatch: any,
  data: typeChangeEmail
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
