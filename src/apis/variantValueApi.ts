import instance from '../config/configAxios';
import { URL_API } from '../constants';
import { IGetAllVariantValue } from '../types/variantValue';

const getAll = (params?: IGetAllVariantValue) => {
  return instance.get(`${URL_API}/variantValue/getAll`, {
    params,
  });
};

export const variantValueApi = {
  getAll,
};
