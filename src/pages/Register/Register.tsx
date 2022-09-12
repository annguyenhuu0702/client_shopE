import React from 'react';
import 'antd/dist/antd.css';

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
    <main className="auth">
      <div className="p-50">
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
          >
            <Form.Item
              label="Họ và tên"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: 'Please fill in this field!',
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
                  message: 'Please fill in this field!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
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
                  message: 'Please enter a password',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters',
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
