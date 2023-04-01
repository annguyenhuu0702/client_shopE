import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { authApi } from '../../../apis/authApi';
import { routes } from '../../../config/routes';

const ResetPassword: React.FC = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');

  const onFinish = async (values: any) => {
    if (id && token) {
      const res = await authApi.resetPassword({
        id: id,
        token: token,
        password: values.password,
      });
      if (res.status === 200) {
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật mật khẩu thành công',
          placement: 'bottomRight',
          duration: 3,
        });
        navigate(routes.login);
      }
    }
    console.log(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const getEmail = async () => {
      if (id && token) {
        const res = await authApi.getEmailFogotPassword(id, token);
        const { data } = res.data;
        setEmail(data);
      }
    };
    getEmail();
  }, [id, token]);

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
          <span className="text-4xl font-semibold">{email}</span>
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
