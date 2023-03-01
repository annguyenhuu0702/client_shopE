import type { RadioChangeEvent } from 'antd';
import {
  Badge,
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import React, { useState } from 'react';
import { AiOutlineRollback } from 'react-icons/ai';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useTitle } from '../../hooks/useTitle';
import province from '../../province.json';

const { TextArea } = Input;

const CheckoutPage: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(0);

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const initialValue = {
    fullname: '',
    phone: '',
    city: '',
    ward: '',
    district: '',
    street: '',
    coupon: '',
    payment: 0,
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeCity = (value: string) => {
    const checkProvince: any = province.find(
      (item: any) => item.name === value
    );
    if (checkProvince) {
      setDistricts(checkProvince.districts);
    }
    console.log(`selected ${value}`);
  };

  const handleChangeDistrict = (value: string) => {
    const checkDistrict: any = districts.find(
      (item: any) => item.name === value
    );
    if (checkDistrict) {
      setWards(checkDistrict.wards);
    }
    console.log(`selected ${value}`);
  };

  const handleChangeWard = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  useTitle('Thủ tục thanh toán');

  return (
    <main className="p-50 my-20 max-lg:px-40 max-sm:px-6 max-sm:mt-24">
      <Form
        name="checkout"
        layout="vertical"
        initialValues={initialValue}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row
          gutter={[16, 16]}
          className="flex-nowrap max-sm:flex-wrap max-lg:flex-wrap"
        >
          <Col xl={16} md={24} xs={24}>
            <Row gutter={[24, 24]}>
              <Col xl={12} md={16} xs={24}>
                <div>
                  <h2 className="m-0 text-4xl font-bold">
                    Thông tin giao hàng
                  </h2>
                </div>
                <Form.Item
                  className="mt-8"
                  label="Họ và tên"
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
                  label="Số điện thoại"
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
                <Form.Item
                  label="Tỉnh thành"
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
                {districts.length > 0 && (
                  <Form.Item
                    label="Quận huyện"
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
                )}
                {wards.length > 0 && (
                  <Form.Item
                    label="Phường xã"
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
                )}
                <Form.Item
                  label="Địa chỉ"
                  name="street"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col xl={12} md={16} xs={24}>
                <div className="mb-12">
                  <h2 className="m-0 text-4xl font-bold">Thanh toán</h2>
                </div>
                <Form.Item
                  name="payment"
                  className="mt-20 max-sm:mt-0 max-lg:mt-0"
                >
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <div className="flex items-center justify-between border-2 border-solid border-border-checkout px-4 py-4 mb-4">
                        <Radio value={0}>
                          <span className="text-3xl mr-20">
                            Thanh toán khi nhận hàng (Cod)
                          </span>
                        </Radio>
                        <div className="flex items-center text-4xl text-yellow-500">
                          <FaMoneyBillAlt />
                        </div>
                      </div>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xl={8} md={24} xs={24}>
            <div className="bg-bg-checkout p-8">
              <div className="pb-8 border-solid border-0 border-b-2 border-white">
                <h2 className="m-0">Đơn hàng (1 sản phẩm)</h2>
              </div>
              <div className="flex justify-between pt-8">
                <div className="flex">
                  <div className="mr-6">
                    <Badge count={5}>
                      <img
                        src="https://bizweb.dktcdn.net/thumb/thumb/100/438/408/products/ao-ba-lo-nu-bln5072-xnh-8-yodyvn.jpg?v=1676609030590"
                        alt=""
                      />
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold">
                      Áo 2 Dây Nữ Dáng Ôm Tôn Dáng
                    </span>
                    <span className="text-xl">Xanh nhạt / S</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-semibold">1000</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-8 pb-8 border-solid border-0 border-b-2 border-white">
                <div className="w-full mr-12">
                  <Form.Item name="coupon" className="mb-0">
                    <Input size="large" placeholder="Nhập mã giảm giá" />
                  </Form.Item>
                </div>
                <Form.Item className="mb-0" shouldUpdate>
                  {() => (
                    <Button
                      type="primary"
                      size="large"
                      className="flex items-center justify-center w-44 text-white"
                      disabled={
                        !form.isFieldsTouched(false) ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }: any) => errors.length).length
                      }
                    >
                      Áp dụng
                    </Button>
                  )}
                </Form.Item>
              </div>
              <div className="mt-8 pb-8 border-solid border-0 border-b-2 border-white">
                <div className="flex justify-between items-center text-2xl font-semibold mb-4">
                  <span>Tạm tính</span>
                  <span>1000000</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-semibold">
                  <span>Phí vận chuyển</span>
                  <span>1000000</span>
                </div>
                <div></div>
              </div>
              <div className="mt-8 pb-8 border-solid border-0 border-b-2 border-white">
                <div className="flex justify-between items-center ">
                  <span className="text-2xl font-semibold mb-4">Tổng cộng</span>
                  <span className="text-4xl font-semibold mb-4 text-amber-500">
                    1631132323132
                  </span>
                </div>
              </div>
              <div className="mt-8 pb-8 flex items-center justify-between">
                <div>
                  <Link
                    to={routes.cart}
                    className="text-2xl hover:text-amber-600 flex"
                  >
                    <span className="flex items-center mr-2">
                      <AiOutlineRollback />
                    </span>
                    Quay lại giỏ hàng
                  </Link>
                </div>
                <Form.Item className="mb-0 bg-btn-order rounded-none">
                  <button
                    type="submit"
                    className=" bg-btn-order flex items-center justify-center uppercase py-6 px-12 text-white text-2xl border-none outline-none rounded-xl cursor-pointer hover:bg-hover-btn-order hover:rounded-none"
                  >
                    Đặt hàng
                  </button>
                </Form.Item>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </main>
  );
};

export default CheckoutPage;
