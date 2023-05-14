import instance from '../config/configAxios';

const getAll = () => {
  return instance.get(`variant/getAll`);
};

export const variantApi = {
  getAll,
};
