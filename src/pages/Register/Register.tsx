import React from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    dispatch(authActions.register({ ...values, navigate }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useTitle('Register');
  return (
    <main className="auth max-sm:mt-24">
      <div className="p-50 max-sm:p-0">
        <div className="container-auth">
          <div className="title">
            <span>Tạo tài khoản</span>
          </div>
          <Form
            name="Register"
            initialValues={{ fullname: '', email: '', password: '' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="form-custom"
            labelAlign="left"
            layout="vertical"
          >
            <Form.Item
              label="Họ và tên"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống!',
                },
                {
                  type: 'email',
                  message: 'Vui lòng nhập email hợp lệ!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu',
                },
                {
                  min: 6,
                  message: 'Mật khẩu có tối thiểu 6 kí tự',
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="btn-auth">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Register;
