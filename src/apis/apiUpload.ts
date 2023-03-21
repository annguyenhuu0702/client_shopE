import { AxiosResponse } from 'axios';
import instance from '../config/configAxios';

const uploadImage = (formData: any): Promise<AxiosResponse> => {
  return instance.post(`upload/single`, formData);
};

const uploadImages = (formData: any): Promise<AxiosResponse> => {
  return instance.post(`upload/multiple`, formData);
};

export const apiUpload = {
  uploadImage,
  uploadImages,
};
