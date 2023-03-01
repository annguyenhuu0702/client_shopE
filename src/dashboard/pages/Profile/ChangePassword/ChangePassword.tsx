import React from 'react';

import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  authActions,
  authSelector,
  authState,
} from '../../../../redux/slice/authSlice';

const ChangePassword: React.FC = () => {
  const { user }: authState = useSelector(authSelector);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    currentpassword: '',
    newpassword: '',
    confirmpassword: '',
  };
  const onFinish = (values: any) => {
    dispatch(
      authActions.changePassword({
        token: user.accessToken,
        dispatch,
        data: {
          currentpassword: values.currentpassword,
          newpassword: values.newpassword,
        },
        navigate,
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
    >
      <Form.Item
        label="Mật khẩu hiện tại"
        name="currentpassword"
        rules={[
          {
            required: true,
            message: 'Vui lòng không bỏ trống!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Mật khẩu mới"
        name="newpassword"
        rules={[
          {
            required: true,
            message: 'Vui lòng không bỏ trống!',
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
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }: any) => ({
            validator(_: any, value: any) {
              if (!value || getFieldValue('newpassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu chưa trùng khớp!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 20 }} labelAlign="right" shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={
              !form.isFieldsTouched(false) ||
              !!form.getFieldsError().filter(({ errors }: any) => errors.length)
                .length
            }
          >
            Lưu
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
