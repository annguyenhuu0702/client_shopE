import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Form, message, Modal, Row, Select, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productImageApi } from '../../../../apis/productImage';
import { variantValueApi } from '../../../../apis/variantValueApi';
import { URL_API } from '../../../../constants';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import { productSelector } from '../../../../redux/slice/productSlice';
import { variantValue } from '../../../../types/variantValue';

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
  const { user } = useSelector(authSelector);
  const { isModal, title } = useSelector(modalSelector);
  const { currentProduct } = useSelector(productSelector);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [pathImgs, setPathImgs] = useState<
    Array<{
      path: string;
      variantValueId: number | null;
    }>
  >([]);
  const [variantValues, setVariantValues] = useState<variantValue[]>([]);

  const handleOk = () => {
    form.submit();
    console.log('helo');
  };

  const handleCancel = () => {
    dispatch(modalActions.hideModal());
  };

  console.log('currentProduct:', currentProduct);

  const onFinish = async (values: any) => {
    try {
      if (currentProduct) {
        const { data } = await productImageApi.createMany(
          user.accessToken,
          dispatch,
          pathImgs.map((item: any) => ({
            ...item,
            productId: currentProduct.id,
          }))
        );
        console.log('data', data);
        dispatch(modalActions.hideModal());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log(info);

    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(
        info.fileList.map((file: any) => ({
          path: file.response,
          variantValueId: null,
        })) as any
      );
      setPathImgs(
        info.fileList.map((file: any) => ({
          path: file.response.data[0].secure_url,
          variantValueId: null,
        })) as any
      );
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await variantValueApi.getAll({
          variantName: 'Màu sắc',
        });
        setVariantValues(data.data.rows);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
      width={1000}
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
            name="images"
            listType="picture-card"
            multiple
            className="avatar-uploader"
            showUploadList={true}
            action={`${URL_API}/upload/multiple`}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
        </Form.Item>
        <Row gutter={[16, 16]}>
          {pathImgs.map((item: any) => {
            return (
              <Col key={item.path} xs={6}>
                <div className="overflow-hidden">
                  <div
                    className="h-0 relative"
                    style={{
                      paddingBottom: '130%',
                    }}
                  >
                    <img src={item.path} alt="" className="w-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>
                    Chọn màu
                  </span>
                  <Select
                    className="w-full"
                    onChange={(value) => {
                      setPathImgs((state) =>
                        state.map((s: any) =>
                          s.path === item.path
                            ? { ...s, variantValueId: value }
                            : s
                        )
                      );
                    }}
                  >
                    {variantValues.map((variantValue) => (
                      <Select.Option
                        key={variantValue.id}
                        value={variantValue.id}
                      >
                        {variantValue.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </Col>
            );
          })}
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalProductImage;
