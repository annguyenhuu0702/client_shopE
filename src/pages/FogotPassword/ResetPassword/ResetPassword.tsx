import { Button, Form, Input } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../../apis/authApi';
import { routes } from '../../../config/routes';
import { authSelector } from '../../../redux/slice/authSlice';

const ResetPassword: React.FC = () => {
  const { id, token } = useSelector(authSelector);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const res = await authApi.resetPassword({
      id,
      token,
      password: values.password,
    });
    console.log(values);
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
          name="reset-password"
          style={{ width: '100%' }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng không bỏ trống!',
              },
              {
                min: 6,
                message: 'Mật khẩu tối thiểu 6 kí tự!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmpassword"
            dependencies={['confirmpassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Vui lòng không bỏ trống!',
              },
              ({ getFieldValue }: any) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Mật khẩu không trùng khớp!')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
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

export default ResetPassword;
