import { Button, Form, Input } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../../redux/slice/authSlice';
import { newsApi } from '../../../../apis/newsApi';

const FormNews: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const [form] = Form.useForm();
  const initialValues = {
    title: '',
    content: '',
    userId: null,
  };

  const onFinish = async (values: any) => {
    console.log(values);
    if (user.accessToken && user?.user?.id) {
      const res = await newsApi.create(user.accessToken, dispatch, {
        title: values.title,
        content: values.content,
        userId: user?.user?.id,
      });
      console.log(res);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <section className="section-common">
      {/* <HeaderTitle title={currentCategory ? 'Sửa danh mục' : 'Thêm danh mục'} /> */}
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <Form
              initialValues={initialValues}
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              labelAlign="left"
            >
              <div>
                <Form.Item
                  label="Tiêu đề"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                  <ReactQuill theme="snow" />
                </Form.Item>
                <Form.Item
                  shouldUpdate
                  style={{
                    textAlign: 'center',
                  }}
                  wrapperCol={{ span: 14 }}
                >
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        !form.isFieldsTouched(false) ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                      style={{
                        width: '200px',
                      }}
                      size="large"
                    >
                      Thêm
                      {/* {currentCategory ? 'Sửa' : 'Thêm'} */}
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </Content>
    </section>
  );
};

export default FormNews;
