import { AxiosResponse } from 'axios';
import { apiCallerWithToken } from '../config/configAxios';
import { AppDispatch } from '../redux/store';

const getFavoriteProductByUser = (
  token: string | null,
  dispatch: AppDispatch
): Promise<AxiosResponse> => {
  return apiCallerWithToken(token, dispatch).get(`favoriteProduct/getByUser`);
};

export const favoriteProductApi = {
  getFavoriteProductByUser,
};
