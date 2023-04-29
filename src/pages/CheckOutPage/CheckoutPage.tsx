import { RadioChangeEvent, notification } from 'antd';
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
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useTitle } from '../../hooks/useTitle';
import province from '../../province.json';
import { authSelector } from '../../redux/slice/authSlice';
import { cartSelector } from '../../redux/slice/cartSlice';
import { castToVND } from '../../utils';
import { paymentApi } from '../../apis/paymentApi';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authSelector);
  const [form] = Form.useForm();
  const [value, setValue] = useState(0);

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const { cart } = useSelector(cartSelector);

  const initialValue = {
    fullname: user.user ? user.user.fullname : '',
    phone: user.user ? user.user.phone : '',
    city: user.user ? user.user.city : '',
    ward: user.user ? user.user.ward : '',
    district: user.user ? user.user.district : '',
    street: user.user ? user.user.address : '',
    accumulatedPoints: 0,
    payment: 1,
  };

  const onFinish = async (values: any) => {
    try {
      if (user) {
        const res = await paymentApi.create(user.accessToken, dispatch, {
          ...values,
          point: values.accumulatedPoints,
          shippingCost,
          totalPrice: totalPrice(),
        });
        const { data, status } = res;
        console.log(data);
        if (status === 201) {
          navigate(routes.paymentSuccess);
        } else {
          notification.error({
            message: 'Thất bại',
            description: 'Có lỗi khi điền form dữ liệu!',
            placement: 'bottomRight',
            duration: 3,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
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

  const totalPrice = () => {
    let totalPrice =
      cart &&
      cart.cartItems.reduce(
        (prev, currentValue) =>
          currentValue.productVariant.product.priceSale > 0
            ? prev +
              currentValue.productVariant.product.priceSale *
                currentValue.quantity
            : prev +
              currentValue.productVariant.product.price * currentValue.quantity,
        0
      );
    return totalPrice || 0;
  };

  let shippingCost = totalPrice() > 499000 ? 0 : 30000;

  const totalProduct = () => {
    let totalProduct =
      cart &&
      cart.cartItems.reduce(
        (prev, currentValue) => prev + currentValue.quantity,
        0
      );
    return totalProduct || 0;
  };

  useTitle('Thủ tục thanh toán');

  return (
    <main className="p-50 mt-20 max-lg:px-40 max-sm:px-6 max-sm:mt-24">
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
                <Form.Item label="Địa chỉ cụ thể" name="street">
                  <Input />
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
                        <Radio value={1}>
                          <span className="text-3xl mr-20">
                            Thanh toán khi nhận hàng (Cod)
                          </span>
                        </Radio>
                        <div className="flex items-center text-4xl text-yellow-500">
                          <FaMoneyBillAlt />
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-2 border-solid border-border-checkout px-4 py-4 mb-4">
                        <Radio value={2}>
                          <span className="text-3xl mr-20">
                            Thanh toán qua cổng PayPal
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
                <h2 className="m-0">Đơn hàng ({totalProduct()} sản phẩm)</h2>
              </div>
              {cart &&
                cart.cartItems.map((cartItem) => {
                  let images =
                    cartItem.productVariant.product.productImages.filter(
                      (item) =>
                        cartItem.productVariant.variantValues.find(
                          (variantValue) =>
                            variantValue.id === item.variantValueId
                        )
                    );
                  images.sort((a, b) => a.id - b.id);
                  return (
                    <div
                      className="flex justify-between pt-8"
                      key={cartItem.id}
                    >
                      <div className="flex">
                        <div className="mr-6">
                          <Badge count={cartItem.quantity}>
                            <img
                              className="w-28 h-20 object-contain"
                              src={images[0].path}
                              alt=""
                            />
                          </Badge>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-semibold">
                            {cartItem.productVariant.product.name}
                          </span>
                          <span className="text-xl">
                            {cartItem.productVariant.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-2xl font-semibold">
                          {castToVND(
                            cartItem.productVariant.product.priceSale > 0
                              ? cartItem.productVariant.product.priceSale
                              : cartItem.productVariant.product.price
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              <div className="flex items-center justify-between mt-8 pb-8 border-solid border-0 border-b-2 border-white">
                <div className="w-full mr-12">
                  <Form.Item name="accumulatedPoints" className="mb-0">
                    <Input
                      size="large"
                      placeholder="Nhập điểm tích lũy của bạn"
                    />
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
                  <span>{castToVND(totalPrice())}</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-semibold">
                  <span>Phí vận chuyển</span>
                  <span>{castToVND(shippingCost)}</span>
                </div>
                <div></div>
              </div>
              <div className="mt-8 pb-8 border-solid border-0 border-b-2 border-white">
                <div className="flex justify-between items-center ">
                  <span className="text-2xl font-semibold mb-4">Tổng cộng</span>
                  <span className="text-4xl font-semibold mb-4 text-amber-500">
                    {castToVND(totalPrice() + shippingCost)}
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
