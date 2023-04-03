import { Button, Form, Input, InputNumber, Layout, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi } from '../../../../apis/productApi';
import { useTitle } from '../../../../hooks/useTitle';
import { authSelector } from '../../../../redux/slice/authSlice';

import TextArea from 'antd/lib/input/TextArea';
import {
  productCategoryActions,
  productCategorySelector,
} from '../../../../redux/slice/productCategorySlice';
import { configSlugify } from '../../../../utils';
import HeaderTitle from '../../../components/HeaderTitle';

import {
  productActions,
  productSelector,
} from '../../../../redux/slice/productSlice';

const { Content } = Layout;

const FormProduct: React.FC = () => {
  const { productCategories, page } = useSelector(productCategorySelector);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector(authSelector);

  const { currentProduct } = useSelector(productSelector);

  const initialValues = {
    name: currentProduct ? currentProduct.name : '',
    productCategoryId: currentProduct ? currentProduct.productCategoryId : '',
    price: currentProduct ? currentProduct.price : 0,
    priceSale: currentProduct ? currentProduct.priceSale : 0,
    thumbnail: currentProduct ? currentProduct.thumbnail : '',
    description: currentProduct ? currentProduct.description : '',
    material: currentProduct ? currentProduct.material : '',
    guide: currentProduct ? currentProduct.guide : '',
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();

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
      material: values.material,
      guide: values.guide,
    };
    if (!currentProduct) {
      dispatch(
        productActions.createProduct({
          token: user.accessToken,
          dispatch,
          data: { ...formData, resetValues },
          navigate,
        })
      );
    } else {
      console.log(formData);
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
    dispatch(productCategoryActions.getAllProductCategory({}));
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
            productCategoryId: data && data.productCategoryId,
            price: data.price,
            priceSale: data.priceSale,
            description: data.description,
            material: data.material,
            guide: data.guide,
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
                  showSearch={true}
                  filterOption={(input, option: any) => {
                    return (
                      option.label
                        .toLowerCase()
                        .indexOf(input.toLocaleLowerCase()) >= 0
                    );
                  }}
                  allowClear
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
                <InputNumber min={0} className="w-full" />
              </Form.Item>
              <Form.Item label="Giá khuyến mãi" name="priceSale">
                <InputNumber min={0} className="w-full" />
              </Form.Item>
              <Form.Item label="Mô tả" name="description">
                <TextArea rows={2} />
              </Form.Item>
              <Form.Item label="Chất liệu" name="material">
                <Input />
              </Form.Item>
              <Form.Item label="Hướng dẫn sử dụng" name="guide">
                <TextArea rows={7} />
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
                    {currentProduct ? 'Sửa' : 'Thêm'}
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </section>
  );
};

export default FormProduct;
