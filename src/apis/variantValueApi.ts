import instance from '../config/configAxios';
import { URL_API } from '../constants';
import { getAllVariantValue } from '../types/variantValue';

const getAll = (params?: getAllVariantValue) => {
  return instance.get(`${URL_API}/variantValue/getAll`, {
    params,
  });
};

// const getById = (id: string) => {
//   return instance.get(`${URL_API}/productImage/getById/${id}`);
// };

// const create = (
//   token: string | null,
//   dispatch: AppDispatch,
//   data: createProductVariant
// ): Promise<AxiosResponse> => {
//   return apiCallerWithToken(token, dispatch).post(
//     `${URL_API}/productImage/create`,
//     data
//   );
// };

// const update = (
//   token: string | null,
//   dispatch: AppDispatch,
//   data: updateProductVariant
// ): Promise<AxiosResponse> => {
//   return apiCallerWithToken(token, dispatch).put(
//     `${URL_API}/productImage/update/${data.id}`,
//     data
//   );
// };

// const deleteProductVariant = (
//   token: string | null,
//   dispatch: AppDispatch,
//   id: number
// ): Promise<AxiosResponse> => {
//   return apiCallerWithToken(token, dispatch).delete(
//     `${URL_API}/productImage/delete/${id}`
//   );
// };

export const variantValueApi = {
  // create,
  getAll,
  // getById,
  // update,
  // deleteProductVariant,
};
