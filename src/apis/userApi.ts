import instance from '../config/configAxios';
import { URL_API } from '../constants';

const getAll = () => {
  return instance.get(`${URL_API}/user/getAll`);
};

export const userApi = {
  getAll,
};
