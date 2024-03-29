import React, { useState } from 'react';
import { useTitle } from '../../hooks/useTitle';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/lib/upload';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import province from '../../province.json';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelector } from '../../redux/slice/authSlice';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { URL_API } from '../../constants';

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

const ProfilePage: React.FC = () => {
  const { user } = useSelector(authSelector);
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [pathImg, setPathImg] = useState(user ? user.user?.avatar : '');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [gender, setGender] = useState(true);
  const initialValue = {
    fullname: user ? user.user?.fullname : '',
    phone: user ? user.user?.phone : '',
    email: user ? user.user?.email : '',
    city: user ? user.user?.city : '',
    district: user ? user.user?.district : '',
    ward: user ? user.user?.ward : '',
    birthday: user ? moment(user.user?.birthday) : '',
    gender: user ? user.user?.gender : true,
    avatar: '',
  };
  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const handleChangeCity = (value: string) => {
    const checkProvince: any = province.find(
      (item: any) => item.name === value
    );
    if (checkProvince) {
      setDistricts(checkProvince.districts);
    }
  };

  const handleChangeDistrict = (value: string) => {
    const checkDistrict: any = districts.find(
      (item: any) => item.name === value
    );
    if (checkDistrict) {
      setWards(checkDistrict.wards);
    }
  };

  const handleChangeWard = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    const data = {
      ...values,
      avatar: pathImg,
      birthday: new Date(moment(values.birthday).format('MM/DD/YYYY')),
    };
    dispatch(
      authActions.changeProfileClient({
        token: user.accessToken,
        dispatch,
        data,
        navigate,
      })
    );
  };

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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useTitle('Tài khoản của tôi');
  return (
    <section className="pl-12 pb-36 max-sm:px-4 max-sm:pb-12 max-lg:px-8 max-lg:pb-12">
      <h3 className="mb-8 pt-8 text-4xl">Thông tin tài khoản</h3>
      <Form
        name="profile"
        form={form}
        initialValues={initialValue}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              label="Họ tên:"
              name="fullname"
              className="mb-4"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống ô này!',
                },
              ]}
            >
              <Input placeholder="Nhập họ tên của bạn" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              label="Số điện thoại:"
              name="phone"
              className="mb-4"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống ô này!',
                },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              label="Email:"
              name="email"
              className="mb-4"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống ô này!',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 0]}>
          <Col xl={12} md={24} xs={24} className="flex max-sm:block">
            <Col xl={8} md={8} xs={24}>
              <Form.Item
                className="mb-4"
                label="Tỉnh thành:"
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  onChange={handleChangeCity}
                  options={
                    province &&
                    province.map((item: any) => ({
                      value: item.name,
                      label: item.name,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={8} md={8} xs={24}>
              <Form.Item
                className="mb-4"
                label="Quận huyện:"
                name="district"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  onChange={handleChangeDistrict}
                  options={
                    districts &&
                    districts.map((item: any) => ({
                      value: item.name,
                      label: item.name,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={8} md={8} xs={24}>
              <Form.Item
                className="mb-4"
                label="Phường xã:"
                name="ward"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  onChange={handleChangeWard}
                  options={
                    wards &&
                    wards.map((item: any) => ({
                      value: item.name,
                      label: item.name,
                    }))
                  }
                />
              </Form.Item>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              label="Sinh nhật:"
              name="birthday"
              className="mb-4"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống ô này!',
                },
              ]}
            >
              <DatePicker placement="topRight" format="MM/DD/YYYY" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              label="Giới tính:"
              name="gender"
              className="mb-4"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống ô này!',
                },
              ]}
            >
              <Radio.Group onChange={onChange} value={gender}>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={24} xs={24}>
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
        </Row>
        <Row className="mt-8 max-sm:flex max-sm:justify-center max-lg:flex max-lg:justify-center">
          <Col xl={12} className="flex justify-center">
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="flex items-center justify-center w-96 text-white"
                  disabled={
                    !form.isFieldsTouched(false) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
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

export default ProfilePage;
