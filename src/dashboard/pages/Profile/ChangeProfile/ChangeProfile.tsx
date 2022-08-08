import React, { useState } from 'react';
import moment from 'moment';
import { Button, DatePicker, Form, Input, Radio, RadioChangeEvent } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { typeUser } from '../../../../types/user';
import { authActions } from '../../../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const ChangeProfile: React.FC = () => {
  const token: string | null = useSelector(
    (state: any) => state.auth.currentUser.accessToken
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [gender, setGender] = useState(1);

  const currentUser: typeUser | null = useSelector(
    (state: any) => state.auth.currentUser.user
  );
  const onFinish = (values: any) => {
    const data = {
      ...values,
      birthday: new Date(moment(values.birthday).format('YYYY/MM/DD')),
    };
    if (token) {
      dispatch(
        authActions.changeProfile({
          token,
          dispatch,
          data,
        })
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const initialValues = {
    fullname: currentUser && currentUser.fullname,
    birthday: currentUser && moment(currentUser.birthday),
    gender: currentUser && currentUser.gender,
  };

  const dateFormat = 'YYYY/MM/DD';

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
        <DatePicker format={dateFormat} allowClear={false} />
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
