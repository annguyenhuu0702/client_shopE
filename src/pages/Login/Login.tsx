import React from 'react';
import styles from './__login.module.scss';
import classNames from 'classnames/bind';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slice/authSlice';
import { useTitle } from '../../hooks/useTitle';

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
    <main className="auth max-sm:mt-24">
      <div className="p-50 max-sm:p-0">
        <div className="container-auth">
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
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
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
              Bằng cách tạo một tài khoản với cửa hàng của chúng tôi, bạn có thể
              thao tác quy trình thanh toán nhanh hơn, lưu trữ nhiều địa chỉ
              giao hàng, xem và theo dõi các đơn hàng của bạn trong phần tài
              khoản của bạn và hơn thế nữa.
            </span>
            <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
