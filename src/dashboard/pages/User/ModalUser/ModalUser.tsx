import React, { useState } from 'react';

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
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../../../../constants';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import { userActions, userSelector } from '../../../../redux/slice/userSlice';

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

const ModalUser: React.FC = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(userSelector);

  const { user } = useSelector(authSelector);

  const { isModal, title } = useSelector(modalSelector);

  const initialValues = {
    email: currentUser ? currentUser.email : '',
    fullname: currentUser ? currentUser.fullname : '',
    gender: currentUser ? currentUser.gender : true,
    password: '',
    phone: currentUser ? currentUser.phone : '',
    avatar: currentUser ? currentUser.avatar : '',
  };

  const [form] = Form.useForm();
  const [gender, setGender] = useState(1);

  // disable button when not input data
  const [disabledSave, setDisabledSave] = useState(true);
  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [pathImg, setPathImg] = useState<string>(
    currentUser ? currentUser.avatar : ''
  );

  const handleChangeUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setPathImg(info.file.response.data.secure_url);
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

  const hideModal = () => {
    dispatch(modalActions.hideModal());
  };

  const resetValues = () => {
    form.setFieldsValue(initialValues);
  };

  const onFinish = (values: any) => {
    const formData = {
      email: values.email,
      avatar: pathImg,
      fullname: values.fullname,
      password: values.password,
      phone: values.phone,
      gender: values.gender,
    };
    if (currentUser === null) {
      dispatch(
        userActions.createUser({
          token: user.accessToken,
          dispatch,
          data: { ...formData, resetValues },
        })
      );
    } else {
      dispatch(
        userActions.editUser({
          token: user.accessToken,
          dispatch,
          data: { ...formData, id: currentUser.id, resetValues },
        })
      );
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>
      <Modal
        title={title}
        open={isModal}
        destroyOnClose
        centered
        onOk={form.submit}
        onCancel={hideModal}
        okText="Lưu"
        cancelText="Quay lại"
        width={1000}
        okButtonProps={{ disabled: disabledSave }}
      >
        <Form
          initialValues={initialValues}
          form={form}
          onFieldsChange={handleFormChange}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <Col xl={12} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {!currentUser && (
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              )}

              <Form.Item label="Hình ảnh">
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={`${URL_API}/upload/single`}
                  beforeUpload={beforeUpload}
                  onChange={handleChangeUpload}
                >
                  {pathImg ? (
                    <img
                      src={pathImg}
                      alt="avatar"
                      style={{
                        width: '90px',
                        height: '90px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col xl={12} md={12}>
              <Form.Item
                label="Họ tên"
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="SĐT"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Giới tính" name="gender">
                <Radio.Group
                  onChange={(e: RadioChangeEvent) => {
                    setGender(e.target.value);
                  }}
                  value={gender}
                >
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
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
