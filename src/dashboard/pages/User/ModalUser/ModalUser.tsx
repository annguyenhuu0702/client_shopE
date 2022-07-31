import React, { useState } from 'react';

import 'antd/dist/antd.css';
import styles from './__modalUser.module.scss';
import classNames from 'classnames/bind';

import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/lib/upload';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Upload,
} from 'antd';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../redux/slice/userSlice';

const cx = classNames.bind(styles);

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface Props {
  visible: boolean;
  setVisible: any;
}

const initialValues = {
  remember: true,
  email: '',
  fullname: '',
  gender: true,
  password: '',
  phone: '',
  city: '',
  avatar: '',
};

const ModalUser: React.FC<Props> = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [gender, setGender] = useState(1);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChangeUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onFinishModal = (values: any) => {
    dispatch(userActions.createUser({ ...values }));
    setVisible(false);
    form.setFieldsValue(initialValues);
  };

  const onFinishFailedModal = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>
      <Modal
        title="Add User"
        destroyOnClose
        centered
        visible={visible}
        onOk={form.submit}
        onCancel={hideModal}
        okText="Save"
        cancelText="Back"
        width={1000}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={initialValues}
          onFinish={onFinishModal}
          onFinishFailed={onFinishFailedModal}
          autoComplete="off"
          labelAlign="left"
        >
          <div className={cx('wrap-form-modal')}>
            <Col xl={12} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please fill in this field!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please fill in this field!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label="Avatar">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChangeUpload}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col xl={12} md={12}>
              <Form.Item
                label="Fullname"
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
                label="Phone"
                name="phone"
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
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Please fill in this field!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                <Radio.Group onChange={onChange} value={gender}>
                  <Radio value={true}>Male</Radio>
                  <Radio value={false}>Female</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ModalUser;
