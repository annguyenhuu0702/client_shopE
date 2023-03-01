import React from 'react';
import { useTitle } from '../../../hooks/useTitle';
import { Button, Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions, authSelector } from '../../../redux/slice/authSlice';

const ChangePasswordUser: React.FC = () => {
  const { user } = useSelector(authSelector);
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
      authActions.changePasswordUser({
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
  useTitle('Đổi mật khẩu');
  return (
    <section className="pl-12 pb-36 max-sm:px-4 max-sm:pb-12 max-lg:px-8 max-lg:pb-12">
      <h3 className="mb-8 pt-8 text-4xl">Thay đổi mật khẩu</h3>
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              label="Mật khẩu hiện tại:"
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
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              label="Mật khẩu mới"
              name="newpassword"
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
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={24} xs={24}>
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
                    if (!value || getFieldValue('newpassword') === value) {
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
          </Col>
        </Row>
        <Row className="mt-8 max-sm:flex max-sm:justify-center max-lg:flex max-lg:justify-center">
          <Col xl={12} className="flex justify-center">
            <Form.Item labelAlign="right" shouldUpdate>
              {() => (
                <Button
                  className="flex items-center justify-center w-96 text-white"
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={
                    !form.isFieldsTouched(false) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }: any) => errors.length).length
                  }
                >
                  Lưu
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default ChangePasswordUser;
