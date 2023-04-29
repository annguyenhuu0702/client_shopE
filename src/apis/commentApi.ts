import { AxiosResponse } from 'axios';
import instance from '../config/configAxios';
import { queryParams } from '../types/common';

const getAllByProduct = (
  productId: number,
  params?: queryParams
): Promise<AxiosResponse> => {
  return instance.get(`comment/getByProduct/${productId}`, {
    params,
  });
};

export const commentApi = {
  getAllByProduct,
};
