import React from 'react';
import styles from './__login.module.scss';
import classNames from 'classnames/bind';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slice/authSlice';
import { useTitle } from '../../hooks/useTitle';
import { routes } from '../../config/routes';

const cx = classNames.bind(styles);

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    dispatch(authActions.login({ ...values, navigate }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useTitle('Login');
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
              <Link
                to={routes.register}
                className="text-3xl hover:text-blue-500"
              >
                Đăng ký
              </Link>
            </div>
          </div>
          <div className="px-16 mt-8">
            <div className="title">
              <span>Đăng nhập</span>
            </div>
            <div className={cx('group-input')}>
              <Form
                name="Login"
                initialValues={{ email: '', password: '' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="form-custom"
                labelAlign="left"
                layout="vertical"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập email!',
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
                      message: 'Vui lòng nhập mật khẩu!',
                    },
                  ]}
                  style={{ marginBottom: '6px' }}
                >
                  <Input.Password
                    size="large"
                    placeholder="Nhập mật khẩu của bạn"
                  />
                </Form.Item>
                <div>
                  <span
                    className="flex justify-end text-blue-500 cursor-pointer"
                    onClick={() => {
                      navigate(routes.fogotPassword);
                    }}
                  >
                    Quên mật khẩu
                  </span>
                </div>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Button type="primary" htmlType="submit" className="btn-auth">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div className={cx('text-register')}>
              <span>
                Bằng cách tạo một tài khoản với cửa hàng của chúng tôi, bạn có
                thể thao tác quy trình thanh toán nhanh hơn, lưu trữ nhiều địa
                chỉ giao hàng, xem và theo dõi các đơn hàng của bạn trong phần
                tài khoản của bạn và hơn thế nữa
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
