import instance from '../config/configAxios';
import { URL_API } from '../constants';
import { typeRegister } from '../types/auth';

const register = (user: typeRegister) => {
  return instance.post(`${URL_API}/auth/register`, user);
};

export const authApi = {
  register,
};
