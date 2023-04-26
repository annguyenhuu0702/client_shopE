import { AxiosResponse } from 'axios';
import instance from '../config/configAxios';

const getAllByProduct = (productId: number): Promise<AxiosResponse> => {
  return instance.get(`comment/getByProduct/${productId}`);
};

export const commentApi = {
  getAllByProduct,
};
