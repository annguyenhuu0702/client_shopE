import axios from 'axios';
import { URL_API } from '../constants';

 const getAllCategory =  () => {
  try {
    return axios.get(`${URL_API}/v1/category`, {
      params: { include: true },
    });
    
  } catch (err) {
    console.log(err);
  }
};


export const categoryApi = {
  getAllCategory
}
