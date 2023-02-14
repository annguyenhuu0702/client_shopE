import { AxiosResponse } from 'axios';
import instance from '../config/configAxios';
import { URL_API } from '../constants';

const uploadImage = (formData: any): Promise<AxiosResponse> => {
  return instance.post(`${URL_API}/upload/single`, formData);
};

const uploadImages = (formData: any): Promise<AxiosResponse> => {
  return instance.post(`${URL_API}/upload/multiple`, formData);
};

export const apiUpload = {
  uploadImage,
  uploadImages,
};
