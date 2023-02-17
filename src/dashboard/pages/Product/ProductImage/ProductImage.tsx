import { useState } from 'react';
import { Form, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  modalSelector,
  modalActions,
} from '../../../../redux/slice/modalSlice';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { URL_API } from '../../../../constants';

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

const ModalProductImage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { isModal, title } = useSelector(modalSelector);

  const handleOk = () => {
    dispatch(modalActions.hideModal());
    console.log('helo');
  };

  const handleCancel = () => {
    dispatch(modalActions.hideModal());
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log(info);

    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as RcFile, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Modal
      title={title}
      open={isModal}
      centered
      destroyOnClose
      // width={1000}
      okText="Lưu"
      cancelText="Quay lại"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="upload-image"
        form={form}
        autoComplete="off"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item>
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            action={`${URL_API}/upload/multiple`}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalProductImage;
