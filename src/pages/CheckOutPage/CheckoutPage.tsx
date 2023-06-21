import { RadioChangeEvent, message, notification } from 'antd';
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
import React, { useCallback, useEffect, useState } from 'react';
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
import { TCoupon } from '../../types/coupon';
import { coupontApi } from '../../apis/coupon';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authSelector);

  const [percent, setPercent] = useState<number>(1);

  const [hideCoupon, setHideCoupon] = useState<boolean>(true);

  const [coupons, setCoupons] = useState<TCoupon[]>([]);

  const [couponId, setCouponId] = useState<number>();

  const [form] = Form.useForm();

  const [value, setValue] = useState(0);
  const [point, setPoint] = useState<number>(0);
  const [priceSale, setPriceSale] = useState<number>(0);

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const { cart } = useSelector(cartSelector);

  const itemOrder = JSON.parse(localStorage.getItem('order') || 'null');
  const isLogin = user.user ? true : false;

  const initialValue = {
    fullname: user.user ? user.user.fullname : '',
    phone: user.user ? user.user.phone : '',
    city: user.user ? user.user.city : '',
    ward: user.user ? user.user.ward : '',
    district: user.user ? user.user.district : '',
    street: user.user ? user.user.address : '',
    accumulatedPoints: 0,
    payment: 1,
    couponId,
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
    // console.log(`selected ${value}`);
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onFinish = async (values: any) => {
    try {
      const newTotal = totalPrice() + shippingCost - priceSale;
      const totalFinish =
        totalPrice() + shippingCost - priceSale - (newTotal * percent) / 100;
      if (value === 2) {
        if (isLogin) {
          const res = await paymentApi.create_url({
            amount: Math.ceil(totalFinish / 1000) * 1000,
          });
          if (res.status === 200) {
            if (user) {
              await paymentApi.create(user.accessToken, dispatch, {
                ...values,
                couponId,
                isPaid: true,
                point: +point,
                shippingCost,
                // totalPrice: totalPrice() + shippingCost - priceSale,
                totalPrice: Math.ceil(totalFinish / 1000) * 1000,
              });
            }
            window.location.href = res.data;
          }
        } else {
          const res = await paymentApi.create_url({
            amount:
              Math.ceil((totalPrice() + shippingCost - priceSale) / 1000) *
              1000,
          });
          if (res.status === 200) {
            const res = await paymentApi.createNologin({
              ...values,
              isPaid: true,
              shippingCost,
              totalPrice: totalPrice() + shippingCost - priceSale,
              ...itemOrder,
            });
            const { status } = res;
            if (status === 201) {
              navigate(routes.paymentSuccess);
              localStorage.removeItem('order');
            } else {
              notification.error({
                message: 'Thất bại',
                description: 'Có lỗi khi điền form dữ liệu!',
                placement: 'bottomRight',
                duration: 3,
              });
            }
          }
          window.location.href = res.data;
        }
      } else {
        if (isLogin) {
          const res = await paymentApi.create(user.accessToken, dispatch, {
            ...values,
            isPaid: false,
            point: +point,
            shippingCost,
            // totalPrice: totalPrice() + shippingCost - priceSale,
            totalPrice: Math.ceil(totalFinish / 1000) * 1000,
            couponId,
          });
          const { status } = res;
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
        } else {
          const res = await paymentApi.createNologin({
            ...values,
            isPaid: true,
            shippingCost,
            totalPrice: totalPrice() + shippingCost - priceSale,
            ...itemOrder,
          });
          const { status } = res;
          if (status === 201) {
            navigate(routes.paymentSuccess);
            localStorage.removeItem('order');
          } else {
            notification.error({
              message: 'Thất bại',
              description: 'Có lỗi khi điền form dữ liệu!',
              placement: 'bottomRight',
              duration: 3,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const totalPrice = () => {
    if (!isLogin) {
      return itemOrder?.productVariant?.product?.priceSale > 0
        ? itemOrder?.productVariant?.product?.priceSale * itemOrder?.quantity
        : itemOrder?.productVariant?.product?.price * itemOrder?.quantity;
    }
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

  // let shippingCost = totalPrice() > 499000 ? 0 : 30000;
  // let shippingCost = 30000;
  const [shippingCost, setShippingCost] = useState<number>(30000);

  const totalProduct = () => {
    let totalProduct =
      cart &&
      cart.cartItems.reduce(
        (prev, currentValue) => prev + currentValue.quantity,
        0
      );
    return totalProduct || 0;
  };

  const handleCheckPoint = async () => {
    try {
      if (point > 1000) {
        setPoint(0);
        message.error({
          type: 'error',
          content: 'Bạn chỉ có thể dùng tối đa 1000 điểm',
        });
      } else {
        const res = await paymentApi.checkPoint(
          user.accessToken,
          dispatch,
          point
        );
        const status = res.status;
        if (status === 200) {
          message.success('Dùng điểm thành công');
          setPriceSale(point * 100);
          setHideCoupon(false);
        }
      }
    } catch (error) {
      setPoint(0);
      message.error('Điểm tích lũy của bạn không đủ!');
      console.log(error);
    }
  };

  const handleCheckCoupon = useCallback(() => {
    try {
      if (couponId) {
        const checkCoupon = async () => {
          const res = await coupontApi.checkCoupon(user.accessToken, dispatch, {
            couponId,
          });
          const { data, status } = res;
          if (status === 200 && data.message === 'freeship') {
            message.info('Thành công');
            setShippingCost(0);
            setHideCoupon(false);
          } else {
            message.info('Thành công');
            setPercent(data.data.percent);
            setHideCoupon(false);
          }
        };
        checkCoupon();
      }
    } catch (error) {
      console.log(error);
    }
  }, [couponId]);

  useEffect(() => {
    if (user.accessToken) {
      try {
        const fetchData = async () => {
          const res = await coupontApi.getCouponByUser(
            user.accessToken,
            dispatch
          );
          const { data, status } = res;
          if (status === 200) {
            setCoupons(data.data.rows);
          }
        };
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

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
                            Thanh toán online bằng VNPay
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
              {isLogin ? (
                cart &&
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
                })
              ) : (
                <div className="flex justify-between pt-8">
                  <div className="flex">
                    <div className="mr-6">
                      <Badge count={itemOrder?.quantity}>
                        <img
                          className="w-28 h-20 object-contain"
                          src={itemOrder?.productVariant?.product?.thumbnail}
                          alt=""
                        />
                      </Badge>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-semibold">
                        {itemOrder?.productVariant?.product?.name}
                      </span>
                      <span className="text-xl">
                        {itemOrder?.productVariant?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl font-semibold">
                      {castToVND(
                        itemOrder?.productVariant?.product?.priceSale > 0
                          ? itemOrder?.productVariant?.product?.priceSale
                          : itemOrder?.productVariant?.product?.price
                      )}
                    </span>
                  </div>
                </div>
              )}
              {isLogin && (
                <>
                  {hideCoupon && (
                    <>
                      <div className="flex items-center justify-between mt-8 pb-4">
                        <div className="w-full mr-12">
                          <Form.Item className="mb-0">
                            <Input
                              value={point}
                              onChange={(e: any) => {
                                setPoint(e.target.value);
                              }}
                              size="large"
                              placeholder="Nhập điểm tích lũy của bạn"
                            />
                          </Form.Item>
                        </div>
                        <Form.Item className="mb-0">
                          <Button
                            type="primary"
                            size="large"
                            className="flex items-center justify-center w-44 text-white"
                            onClick={() => {
                              handleCheckPoint();
                            }}
                          >
                            Áp dụng
                          </Button>
                        </Form.Item>
                      </div>
                      <div className="flex flex-col pb-8 border-solid border-0 border-b-2 border-white">
                        <span className="text-2xl">
                          Bạn hiện đang có <b>{user.user?.accumulatedPoints}</b>{' '}
                          điểm.
                        </span>
                        {user.user && user.user?.accumulatedPoints > 0 && (
                          <span className="text-2xl">
                            Lưu ý: Chỉ có thể sử dụng tối đa 1000 điểm.
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {isLogin && hideCoupon && (
                    <div className="flex flex-col pb-8 mt-8 border-solid border-0 border-b-2 border-white">
                      <Radio.Group>
                        <Space direction="vertical">
                          {coupons &&
                            coupons.length > 0 &&
                            coupons.map((item) => {
                              return (
                                <div
                                  className="flex items-center justify-between  px-4 py-4 mb-4"
                                  key={item?.id}
                                  onClick={() => {
                                    setCouponId(item.id);
                                  }}
                                >
                                  <Radio value={item?.id}>
                                    <div className="flex flex-col gap-4">
                                      <span className="text-2xl">
                                        {item?.name}
                                      </span>
                                      <span className="text-xl">
                                        {item?.description}
                                      </span>
                                    </div>
                                  </Radio>
                                </div>
                              );
                            })}
                        </Space>
                      </Radio.Group>
                      {coupons.length > 0 && (
                        <div>
                          <Button
                            type="default"
                            onClick={() => {
                              handleCheckCoupon();
                            }}
                          >
                            Xác nhận
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="mt-8 pb-8 border-solid border-0 border-b-2 border-white">
                <div className="flex justify-between items-center text-2xl font-semibold mb-4">
                  <span>Tạm tính</span>
                  <span>{castToVND(totalPrice())}</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-semibold mb-4">
                  <span>Phí vận chuyển</span>
                  <span>{castToVND(shippingCost)}</span>
                </div>
                {isLogin && (
                  <div className="flex justify-between items-center text-2xl font-semibold">
                    <span>Điểm tích lũy</span>
                    <span>-{castToVND(priceSale)}</span>
                  </div>
                )}
              </div>
              <div className="mt-8 pb-8 border-solid border-0 border-b-2 border-white">
                <div className="flex justify-between items-center ">
                  <span className="text-2xl font-semibold mb-4">Tổng cộng</span>
                  <span className="text-4xl font-semibold mb-4 text-amber-500">
                    {isLogin && percent > 1
                      ? castToVND(
                          totalPrice() +
                            shippingCost -
                            priceSale -
                            ((totalPrice() + shippingCost) * percent) / 100
                        )
                      : castToVND(totalPrice() + shippingCost - priceSale)}
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
