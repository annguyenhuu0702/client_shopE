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
import { useTitle } from '../../../../hooks/useTitle';
import { authSelector, authState } from '../../../../redux/slice/authSlice';

import { collectionApi } from '../../../../apis/collectionApi';
import {
  categoryActions,
  categorySelector,
  categoryState,
} from '../../../../redux/slice/categorySlice';
import {
  collectionActions,
  collectionSelector,
  collectionState,
} from '../../../../redux/slice/collectionSlice';
import { slugify } from '../../../../utils';
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

const FormCollection: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user }: authState = useSelector(authSelector);

  const { currentCollection }: collectionState =
    useSelector(collectionSelector);

  const { categories }: categoryState = useSelector(categorySelector);

  const initialValues = {
    name: currentCollection ? currentCollection.name : '',
    categoryId: currentCollection ? currentCollection.categoryId : '',
    thumbnail: currentCollection ? currentCollection.thumbnail : '',
    description: currentCollection ? currentCollection.description : '',
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
    const formData = {
      name: values.name,
      categoryId: values.categoryId,
      description: values.description,
      thumbnail: values.thumbnail,
      slug: slugify(values.name),
    };
    if (currentCollection === null) {
      dispatch(
        collectionActions.createCollection({
          token: user.accessToken,
          dispatch,
          data: { ...formData, resetValues },
          navigate,
        })
      );
    } else {
      dispatch(
        collectionActions.editCollection({
          token: user.accessToken,
          dispatch,
          data: { ...formData, id: currentCollection.id, resetValues },
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
    dispatch(categoryActions.getAllCategory({}));
  }, [dispatch]);

  useEffect(() => {
    try {
      const getCollectionById = async () => {
        if (id) {
          const res = await collectionApi.getById(id);
          const { data } = res.data;
          dispatch(collectionActions.setCollection(data));
          form.setFieldsValue({
            name: data.name,
            categoryId: data.category.name,
            description: data.description,
            thumbnail: data.thumbnail,
          });
        }
      };
      getCollectionById();
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch, form]);

  useTitle(currentCollection ? 'Sửa bộ sưu tập' : 'Thêm bộ sưu tập');

  return (
    <section className="section-common">
      <HeaderTitle
        title={currentCollection ? 'Sửa bộ sưu tập' : 'Thêm bộ sưu tập'}
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
                  label="Danh mục"
                  name="categoryId"
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
                      categories
                        ? categories.rows.map((item: any) => {
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
                      {currentCollection ? 'Sửa' : 'Thêm'}
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

export default FormCollection;
