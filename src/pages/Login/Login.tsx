import React from 'react';
import 'antd/dist/antd.css';
import styles from './__login.module.scss';

import classNames from 'classnames/bind';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slice/authSlice';

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

  return (
    <div className={cx('register')}>
      <div className="w-1200">
        <div className="container-auth">
          <div className="title">
            <span>Đăng nhập</span>
          </div>
          <div className={cx('group-input')}>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="form-custom"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please enter a valid email address',
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
    </div>
  );
};

export default Login;
