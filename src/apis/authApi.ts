import instance from '../config/configAxios';
import { URL_API } from '../constants';
import { typeLogin, typeRegister } from '../types/auth';

const register = (user: typeRegister) => {
  return instance.post(`${URL_API}/auth/register`, user);
};

const login = (user: typeLogin) => {
  return instance.post(`${URL_API}/auth/login`, user);
};

export const logout = () => {
  return instance.post(`${URL_API}/auth/logout`);
};

const getProfile = (id: number) => {
  return instance.get(`${URL_API}/user/getById/${id}`);
};

export const authApi = {
  register,
  login,
  logout,
  getProfile,
};
