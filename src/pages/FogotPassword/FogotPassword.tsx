import { Button, Form, Input, notification } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../apis/authApi';
import { routes } from '../../config/routes';
import { authActions } from '../../redux/slice/authSlice';
const FogotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // const res = await authApi.fogotPassword({
    //   email: values.email,
    // });
    // const { data } = res.data;
    dispatch(
      authActions.fogotPassword({
        email: values.email,
        navigate,
      })
    );
    // dispatch(
    //   authActions.fogotPasswordSuccess({
    //     id: data.id,
    //     token: data.token,
    //   })
    // );
    // if (res.status === 200) {
    //   navigate(`/reset-password/${data.id}/${data.token}`);
    //   notification.success({
    //     message: 'Thành công',
    //     description: 'Vui lòng kiểm tra email của bạn để cập nhật lại mật khẩu',
    //     placement: 'bottomRight',
    //     duration: 5,
    //   });
    // }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '500px',
          background: '#f9f9f9',
          padding: '40px',
        }}
      >
        <div className="mb-8">
          <span className="text-4xl font-semibold">Quên mật khẩu</span>
        </div>
        <Form
          name="fogot-password"
          style={{ width: '100%' }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Vui lòng nhập email hợp lệ',
              },
            ]}
          >
            <Input size="large" placeholder="Nhập email của bạn" />
          </Form.Item>
          <Form.Item className="flex justify-center w-full mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="flex justify-center"
              size="large"
              style={{ width: '100%' }}
            >
              Gửi
            </Button>
          </Form.Item>
          <div className="text-right mt-4">
            <Link to={routes.login} className="text-blue-500 text-2xl">
              Đăng nhập
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FogotPassword;
