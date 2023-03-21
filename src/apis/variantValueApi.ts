import instance from '../config/configAxios';
import { IGetAllVariantValue } from '../types/variantValue';

const getAll = (params?: IGetAllVariantValue) => {
  return instance.get(`variantValue/getAll`, {
    params,
  });
};

export const variantValueApi = {
  getAll,
};
