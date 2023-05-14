import axios, { AxiosRequestConfig } from 'axios';
import jwtDecode from 'jwt-decode';
import { authApi } from '../apis/authApi';
import { STATUS_CODE, URL_API } from '../constants';
import { authActions } from '../redux/slice/authSlice';

const instance = axios.create({
  baseURL: URL_API,
  withCredentials: true,
});

export const decodeToken = (token: string | undefined | null): any => {
  if (!token) return null;
  return jwtDecode(token);
};

export const apiCallerWithToken = (token: string | null, dispatch: any) => {
  const instance = axios.create({
    baseURL: URL_API,
    withCredentials: true,
  });
  instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      try {
        if (config.headers) {
          const decoded = decodeToken(token);
          if (decoded && decoded.exp * 1000 < new Date().getTime()) {
            const res = await authApi.refreshToken();
            if (res && res.data) {
              const { accessToken } = res.data.data;
              if (accessToken) {
                if (dispatch) {
                  dispatch(authActions.getNewAccessToken(accessToken));
                }
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                return config;
              }
            } else {
              console.log({ res });
            }
          }

          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error: any) {
        const { data, status } = error.response;
        if (
          status === STATUS_CODE.UNAUTHORIZED ||
          data.message === 'Login now'
        ) {
          if (dispatch) {
            dispatch(authActions.logoutSuccess());
          }
        }
      }
      return config;
    },
    (err) => {}
  );

  return instance;
};

export default instance;
