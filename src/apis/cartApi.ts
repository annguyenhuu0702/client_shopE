import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';

const getByUser = (token: string | null, dispatch: AppDispatch) => {
  return apiCallerWithToken(token, dispatch).get(`cart/getByUser`);
};

export const cartApi = {
  getByUser,
};
