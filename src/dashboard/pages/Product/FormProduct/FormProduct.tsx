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
import { productApi } from '../../../../apis/productApi';
import { useTitle } from '../../../../hooks/useTitle';
import { authSelector, authState } from '../../../../redux/slice/authSlice';

import TextArea from 'antd/lib/input/TextArea';
import {
  productCategoryActions,
  productCategorySelector,
  productCategoryState,
} from '../../../../redux/slice/productCategorySlice';
import { configSlugify } from '../../../../utils';
import HeaderTitle from '../../../components/HeaderTitle';

import {
  productActions,
  productSelector,
  productState,
} from '../../../../redux/slice/productSlice';

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

const FormProduct: React.FC = () => {
  const { productCategories, page }: productCategoryState = useSelector(
    productCategorySelector
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const { user }: authState = useSelector(authSelector);

  const { currentProduct }: productState = useSelector(productSelector);

  const initialValues = {
    name: currentProduct ? currentProduct.name : '',
    productCategoryId: currentProduct ? currentProduct.productCategoryId : '',
    price: currentProduct ? currentProduct.price : 0,
    priceSale: currentProduct ? currentProduct.priceSale : 0,
    thumbnail: currentProduct ? currentProduct.thumbnail : '',
    description: currentProduct ? currentProduct.description : '',
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    const formData = {
      name: values.name,
      slug: configSlugify(values.name),
      productCategoryId: values.productCategoryId,
      price: values.price,
      priceSale: values.priceSale,
      description: values.description,
      thumbnail: values.thumbnail,
    };
    if (!currentProduct) {
      console.log('ngáo à');
      dispatch(
        productActions.createProduct({
          token: user.accessToken,
          dispatch,
          data: { ...formData, resetValues },
          navigate,
        })
      );
    } else {
      dispatch(
        productActions.editProduct({
          token: user.accessToken,
          dispatch,
          data: { ...formData, id: currentProduct.id, resetValues },
          navigate,
        })
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    dispatch(
      productCategoryActions.getAllProductCategory({
        p: page,
        limit: 7,
      })
    );
  }, [dispatch, page]);

  useEffect(() => {
    try {
      const getProductById = async () => {
        if (id) {
          const res = await productApi.getById(id);
          const { data } = res.data;
          dispatch(productActions.setProduct(data));
          form.setFieldsValue({
            name: data.name,
            productCategoryId: data.productCategoryId,
            price: data.price,
            priceSale: data.priceSale,
            description: data.description,
            thumbnail: data.thumbnail,
          });
        }
      };
      getProductById();
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch, form]);

  useTitle(currentProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm');

  return (
    <section className="section-common">
      <HeaderTitle title={currentProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'} />
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
                  label="Danh mục sản phẩm"
                  name="productCategoryId"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                  ]}
                >
                  <Select
                    onChange={handleChange}
                    options={productCategories.rows.map((item: any) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                  />
                </Form.Item>
                <Form.Item
                  label="Giá"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Giá khuyến mãi" name="priceSale">
                  <Input />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                  <TextArea rows={4} />
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
                      {currentProduct ? 'Sửa' : 'Thêm'}
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

export default FormProduct;