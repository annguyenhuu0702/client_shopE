import React from 'react';

import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  authActions,
  authSelector,
  typeAuthState,
} from '../../../../redux/slice/authSlice';

const ChangePassword: React.FC = () => {
  const { user }: typeAuthState = useSelector(authSelector);

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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
    >
      <Form.Item
        label="Current Password"
        name="currentpassword"
        rules={[
          {
            required: true,
            message: 'Please fill in this field!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newpassword"
        rules={[
          {
            required: true,
            message: 'Please fill in this field!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmpassword"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newpassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 20 }} labelAlign="right">
        <Button type="primary" htmlType="submit" size="large">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
