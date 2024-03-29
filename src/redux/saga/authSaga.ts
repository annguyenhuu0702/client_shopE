import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import jwtDecoded from 'jwt-decode';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../apis/authApi';
import { STATUS_CODE } from '../../constants';
import {
  IFogotPassword,
  changeEmailDto,
  changePasswordDto,
  changeProfileDto,
  loginDto,
  registerDto,
} from '../../types/auth';
import { tokenPayloadData } from '../../types/common';
import { authActions } from '../slice/authSlice';
import { routes } from '../../config/routes';

function* registerSaga({ payload }: PayloadAction<registerDto>): any {
  try {
    const { navigate }: any = payload;
    const res = yield call(() => {
      return authApi.register(payload);
    });
    const { data, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(authActions.registerSuccess(data.data));
      notification.success({
        message: 'Thành công',
        description: 'Tạo tài khoản thành công!',
        placement: 'bottomRight',
        duration: 3,
      });
      navigate(routes.home);
    }
  } catch (error: any) {
    yield put(authActions.registerFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Email này đã tồn tại!',
      placement: 'bottomRight',
      duration: 3,
    });

    console.log(error);
  }
}

function* loginSaga({ payload }: PayloadAction<loginDto>): any {
  try {
    const { navigate }: any = payload;
    const res = yield call(() => {
      return authApi.login(payload);
    });
    const { data, status } = res;
    const role = (jwtDecoded(data.data.accessToken) as any).role;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.loginSuccess(data.data));
      navigate(role === 'admin' ? routes.admin : routes.home);
    }
  } catch (error: any) {
    yield put(authActions.loginFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Email hoặc mật khẩu không chính xác!',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* fogotPasswordSaga({ payload }: PayloadAction<IFogotPassword>): any {
  try {
    const { navigate } = payload;
    const res = yield call(() => {
      return authApi.fogotPassword(payload);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.fogotPasswordSuccess());
      if (navigate) {
        navigate(routes.home);
      }
      notification.success({
        message: 'Thành công',
        description: 'Vui lòng kiểm tra email của bạn để cập nhật lại mật khẩu',
        placement: 'bottomRight',
        duration: 5,
      });
    }
  } catch (error: any) {
    yield put(authActions.fogotPasswordFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Có vẻ như email bạn không đúng!',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* changeProfileSaga({
  payload,
}: PayloadAction<tokenPayloadData<changeProfileDto>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return authApi.changeProfile(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.changeProfileSuccess(data));
      if (navigate) {
        navigate(routes.admin);
      }
      notification.success({
        message: 'Thành công',
        description: 'Thay đổi thông tin thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (error: any) {
    yield put(authActions.changeProfileFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* changePasswordSaga({
  payload,
}: PayloadAction<tokenPayloadData<changePasswordDto>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return authApi.changePassword(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.changePasswordSuccess());
      if (navigate) {
        navigate(routes.admin);
      }
      notification.success({
        message: 'Thành công',
        description: 'Thay đổi mật khẩu thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (error: any) {
    yield put(authActions.changePasswordFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Vui lòng kiểm tra lại mật khẩu của bạn!',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* changeEmailSaga({
  payload,
}: PayloadAction<tokenPayloadData<changeEmailDto>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return authApi.changeEmail(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.changeEmailSuccess(data));
      if (navigate) {
        navigate(routes.admin);
      }
      notification.success({
        message: 'Thành công',
        description: 'Thay đổi email thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (error: any) {
    yield put(authActions.changeEmailFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* changeProfileClientSaga({
  payload,
}: PayloadAction<tokenPayloadData<changeProfileDto>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return authApi.changeProfile(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.changeProfileClientSuccess(data));
      if (navigate) {
        navigate(routes.home);
      }
      notification.success({
        message: 'Thành công',
        description: 'Thay đổi thông tin thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (error: any) {
    yield put(authActions.changeProfileClientFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Lỗi rồi!',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* changePasswordUserSaga({
  payload,
}: PayloadAction<tokenPayloadData<changePasswordDto>>): any {
  try {
    const { token, dispatch, data, navigate } = payload;
    const res = yield call(() => {
      return authApi.changePassword(token, dispatch, data);
    });
    const { status } = res;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(authActions.changePasswordUserSuccess());
      if (navigate) {
        navigate(routes.home);
      }
      notification.success({
        message: 'Thành công',
        description: 'Thay đổi mật khẩu thành công',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  } catch (error: any) {
    yield put(authActions.changePasswordUserFailed());
    notification.error({
      message: 'Thất bại',
      description: 'Vui lòng kiểm tra lại mật khẩu của bạn!',
      placement: 'bottomRight',
      duration: 3,
    });
    console.log(error);
  }
}

function* authSaga() {
  yield takeEvery('auth/register', registerSaga);
  yield takeEvery('auth/login', loginSaga);
  yield takeEvery('auth/fogotPassword', fogotPasswordSaga);
  yield takeEvery('auth/changeProfile', changeProfileSaga);
  yield takeEvery('auth/changeProfileClient', changeProfileClientSaga);
  yield takeEvery('auth/changePassword', changePasswordSaga);
  yield takeEvery('auth/changePasswordUser', changePasswordUserSaga);
  yield takeEvery('auth/changeEmail', changeEmailSaga);
}

export default authSaga;
