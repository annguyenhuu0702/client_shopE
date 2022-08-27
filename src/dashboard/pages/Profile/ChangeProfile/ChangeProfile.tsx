import { Button, DatePicker, Form, Input, Radio, RadioChangeEvent } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  authActions,
  authSelector,
  authState,
} from '../../../../redux/slice/authSlice';

const ChangeProfile: React.FC = () => {
  const { user }: authState = useSelector(authSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [gender, setGender] = useState(1);

  const onFinish = (values: any) => {
    const data = {
      ...values,
      birthday: new Date(moment(values.birthday).format('MM/DD/YYYY')),
    };
    dispatch(
      authActions.changeProfile({
        token: user.accessToken,
        dispatch,
        data,
        navigate,
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const initialValues = {
    fullname: user.user && user.user.fullname,
    birthday: user.user && moment(user.user.birthday),
    gender: user.user && user.user.gender,
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
        label="FullName"
        name="fullname"
        rules={[
          {
            required: true,
            message: 'Please fill in this field!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name="birthday"
        rules={[
          {
            required: true,
            message: 'Please fill in this field!',
          },
        ]}
      >
        <DatePicker format={'MM/DD/YYYY'} allowClear={false} />
      </Form.Item>

      <Form.Item label="Gender" name="gender">
        <Radio.Group
          value={gender}
          onChange={(e: RadioChangeEvent) => {
            setGender(e.target.value);
          }}
        >
          <Radio value={true}>Male</Radio>
          <Radio value={false}>Female</Radio>
        </Radio.Group>
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

export default ChangeProfile;
