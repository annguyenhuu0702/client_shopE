import React from 'react';
import 'antd/dist/antd.css';
import styles from './__register.module.scss';

import classNames from 'classnames/bind';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={cx('register')}>
      <div className="w-1200">
        <div className={cx('container')}>
          <div className={cx('title')}>
            <span>Tạo tài khoản</span>
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
                label="Họ và tên"
                name="full_name"
                rules={[
                  {
                    required: true,
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
                    type: 'email',
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
                    min: 6,
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
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
