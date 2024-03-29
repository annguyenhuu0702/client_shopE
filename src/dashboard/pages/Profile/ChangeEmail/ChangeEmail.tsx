import React from 'react';

import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  authActions,
  authSelector,
  authState,
} from '../../../../redux/slice/authSlice';

const ChangeEmail: React.FC = () => {
  const { user }: authState = useSelector(authSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const initialValues = {
    email: user.user?.email,
  };
  const onFinish = (values: any) => {
    dispatch(
      authActions.changeEmail({
        token: user.accessToken,
        dispatch,
        data: { ...values },
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Vui lòng không bỏ trống!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 20 }} labelAlign="right" shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
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

export default ChangeEmail;
