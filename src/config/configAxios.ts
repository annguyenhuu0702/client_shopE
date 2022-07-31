import axios from 'axios';
import { URL_API } from '../constants';

const instance = axios.create({
  baseURL: URL_API,
  withCredentials: true,
});

// instance.interceptors.response.use((response) => {
//   return response.data
// })

export default instance;
