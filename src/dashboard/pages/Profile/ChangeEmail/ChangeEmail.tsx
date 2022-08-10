import React from 'react';

import { Button, Form, Input } from 'antd';
import { typeUser } from '../../../../types/user';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const ChangeEmail: React.FC = () => {
  const currentUser: typeUser = useSelector(
    (state: any) => state.auth.currentUser.user
  );
  const token: string | null = useSelector(
    (state: any) => state.auth.currentUser.accessToken
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const initialValues = {
    email: currentUser.email,
  };
  const onFinish = (values: any) => {
    dispatch(
      authActions.changeEmail({
        token,
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
            message: 'Please fill in this field!',
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
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            Submit
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default ChangeEmail;
