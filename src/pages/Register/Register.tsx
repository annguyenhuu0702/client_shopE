import React from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import { routes } from '../../config/routes';

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
      <div className="p-50 max-sm:p-0">
        <div className="container-auth">
          <div className="flex justify-between items-center">
            <Link to={routes.home}>
              <img
                className="w-24"
                src="https://res.cloudinary.com/diot4imoq/image/upload/v1661177083/canifa/logo_xju1y6.svg"
                alt=""
              />
            </Link>
            <div>
              <Link to={routes.login} className="text-3xl hover:text-blue-500">
                Đăng nhập
              </Link>
            </div>
          </div>
          <div className="px-16 mt-8">
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
                <Input size="large" placeholder="Nhập họ và tên của bạn" />
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
                <Input size="large" placeholder="Nhập email của bạn" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
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
                <Input.Password
                  size="large"
                  placeholder="Nhập mật khẩu của bạn"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-auth">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
