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

const ModalUser: React.FC<Props> = ({ visible, setVisible }) => {
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
    console.log('radio checked', e.target.value);
    setGender(e.target.value);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onFinishModal = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailedModal = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <React.Fragment>
      <Modal
        destroyOnClose
        centered
        title="Add User"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Save"
        cancelText="Back"
        width={1000}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true, gender: 1 }}
          onFinish={onFinishModal}
          onFinishFailed={onFinishFailedModal}
          autoComplete="off"
          labelAlign="left"
        >
          <div className={cx('wrap-form-modal')}>
            <Col xl={12} md={12}>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password">
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
              <Form.Item label="Fullname" name="fullname">
                <Input />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>

              <Form.Item label="Ward" name="ward">
                <Input.Password />
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                <Radio.Group onChange={onChange} value={gender}>
                  <Radio value={1}>Male</Radio>
                  <Radio value={2}>Female</Radio>
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
