import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, message, Select } from 'antd';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { productCategoryApi } from '../../../../apis/productCategoryApi';
import { useTitle } from '../../../../hooks/useTitle';
import { authSelector, authState } from '../../../../redux/slice/authSlice';
import {
  collectionActions,
  collectionSelector,
  collectionState,
} from '../../../../redux/slice/collectionSlice';

import {
  productCategoryActions,
  productCategorySelector,
  productCategoryState,
} from '../../../../redux/slice/productCategorySlice';
import { configSlugify } from '../../../../utils';
import HeaderTitle from '../../../components/HeaderTitle';

const { Content } = Layout;

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

const FormProductCategory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user }: authState = useSelector(authSelector);

  const { currentProductCategory }: productCategoryState = useSelector(
    productCategorySelector
  );
  const { collections }: collectionState = useSelector(collectionSelector);

  const initialValues = {
    name: currentProductCategory ? currentProductCategory.name : '',
    thumbnail: currentProductCategory ? currentProductCategory.thumbnail : '',
    description: currentProductCategory
      ? currentProductCategory.description
      : '',
    collectionId: currentProductCategory
      ? currentProductCategory.collectionId
      : '',
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();

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

  const resetValues = () => {
    form.setFieldsValue(initialValues);
  };

  const onFinish = (values: any) => {
    console.log(values);
    const formData = {
      name: values.name,
      description: values.description,
      collectionId: values.collectionId,
      thumbnail: values.thumbnail,
      slug: configSlugify(values.name),
    };
    if (currentProductCategory === null) {
      dispatch(
        productCategoryActions.createProductCategory({
          token: user.accessToken,
          dispatch,
          data: { ...formData, resetValues },
          navigate,
        })
      );
    } else {
      dispatch(
        productCategoryActions.editProductCategory({
          token: user.accessToken,
          dispatch,
          data: { ...formData, id: currentProductCategory.id, resetValues },
          navigate,
        })
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    dispatch(collectionActions.getAllCollection({}));
  }, [dispatch]);

  useEffect(() => {
    try {
      const getAllProductCategoryById = async () => {
        if (id) {
          const res = await productCategoryApi.getById(id);
          const { data } = res.data;
          dispatch(productCategoryActions.setProductCategory(data));
          form.setFieldsValue({
            name: data.name,
            collectionId: data.collectionId,
            description: data.description,
            thumbnail: data.thumbnail,
          });
        }
      };
      getAllProductCategoryById();
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch, form]);

  useTitle(
    currentProductCategory ? 'Sửa danh mục sản phẩm' : 'Thêm danh mục sản phẩm'
  );

  return (
    <section className="section-common">
      <HeaderTitle
        title={
          currentProductCategory
            ? 'Sửa danh mục sản phẩm'
            : 'Thêm danh mục sản phẩm'
        }
      />
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
                  label="Tên"
                  name="name"
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
                  label="Bộ sưu tập"
                  name="collectionId"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                  ]}
                >
                  <Select
                    onChange={handleChange}
                    options={
                      collections
                        ? collections.rows.map((item: any) => {
                            return {
                              value: item.id,
                              label: item.name,
                              key: item.id,
                            };
                          })
                        : []
                    }
                  />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                  <Input />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                  <Upload
                    name="thumbnail"
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
                <Form.Item
                  style={{
                    textAlign: 'center',
                  }}
                  wrapperCol={{ span: 14 }}
                  shouldUpdate
                >
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: '200px',
                      }}
                      size="large"
                      disabled={
                        !form.isFieldsTouched(false) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length > 0
                      }
                    >
                      {currentProductCategory ? 'Sửa' : 'Thêm'}
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

export default FormProductCategory;
