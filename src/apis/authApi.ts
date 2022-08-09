import instance, { apiCallerWithToken } from '../config/configAxios';
import { URL_API } from '../constants';
import { typeChangProfile, typeLogin, typeRegister } from '../types/auth';

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
  data: typeChangProfile
) => {
  return apiCallerWithToken(token, dispatch).put(
    `${URL_API}/auth/changeProfile`,
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
};
