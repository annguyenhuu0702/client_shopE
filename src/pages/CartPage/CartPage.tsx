import { Col, Row } from 'antd';
import React from 'react';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useTitle } from '../../hooks/useTitle';
import { cartSelector } from '../../redux/slice/cartSlice';
import { CartItem } from '../../types/cartItem';
import { castToVND } from '../../utils';

const CartPage: React.FC = () => {
  const { cart } = useSelector(cartSelector);

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

  const rootPrice = () => {
    let totalPrice =
      cart &&
      cart.cartItems.reduce(
        (prev, currentValue) =>
          prev +
          currentValue.productVariant.product.price * currentValue.quantity,
        0
      );
    return totalPrice || 0;
  };

  const handleDeleteCartItem = (cartItem: CartItem) => {
    console.log(cartItem.id);
  };

  const navigate = useNavigate();

  useTitle('Giỏ hàng');
  return cart && cart.cartItems.length > 0 ? (
    <main className="p-50 my-20 max-lg:px-0 max-sm:p-0 max-sm:mt-24">
      <Row className="lg:mb-20 ">
        <Col xl={18} md={17} xs={24}>
          <div className="px-16 py-32 bg-bg-cart max-lg:p-10 max-sm:p-8">
            {totalPrice() >= 499000 && (
              <div className="bg-white inline-flex text-lg font-sans rounded-xl mb-10 ">
                <h2 className="m-0 font-normal flex items-center p-5 ">
                  <span className="p-4 rounded-full bg-teal-300 flex items-center justify-center mr-4">
                    <FaShippingFast className="text-white" />
                  </span>
                  Bạn đủ điều kiện để nhận miễn phí vận chuyển
                </h2>
              </div>
            )}
            <div className="pb-8">
              <h2 className="m-0 text-4xl ">
                ({cart?.cartItems.length}) sản phẩm
              </h2>
            </div>
            <div className="w-full">
              <div className="w-full flex items-center text-left bg-name-product text-gray-200 text-2xl p-3 max-sm:hidden">
                <span className="w-2/5 uppercase">Sản phẩm</span>
                <span className="w-1/5 uppercase">Giá tiền</span>
                <span className="w-1/5 uppercase">Số lượng</span>
                <span className="w-1/5 uppercase">Tổng tiền</span>
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
                    <div key={cartItem.id}>
                      <div className="w-full flex text-lef mt-8 pb-8 border-solid border-0 border-b-2 border-border-layout-cart">
                        <div className="w-2/5 max-lg:mr-2 max-sm:w-2/4">
                          <div className="flex ">
                            <div className="w-32">
                              <img
                                className="w-full object-cover"
                                src={images[0].path}
                                alt=""
                              />
                            </div>
                            <div className="w-full pl-4 flex flex-col justify-between">
                              <div className="text-2xl">
                                <Link
                                  to={`/${cartItem.productVariant.product.slug}`}
                                  className="text-black max-lg:line-clamp-1 max-sm:line-clamp-1"
                                >
                                  {cartItem.productVariant.product.name}
                                </Link>
                              </div>
                              <div className="text-2xl">
                                <span className="text-black">
                                  {cartItem.productVariant.name}
                                </span>
                              </div>
                              <div
                                onClick={() => {
                                  handleDeleteCartItem(cartItem);
                                }}
                              >
                                <AiOutlineDelete className="inline-block cursor-pointer hover:text-red-500 " />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/5 max-sm:hidden">
                          <span className="text-2xl font-bold text-red-500">
                            {castToVND(
                              cartItem.productVariant.product.priceSale > 0
                                ? cartItem.productVariant.product.priceSale
                                : cartItem.productVariant.product.price
                            )}
                          </span>
                        </div>
                        <div className="w-1/5 max-sm:justify-end max-sm:w-2/4 max-sm:flex max-sm:items-start max-lg:mr-4">
                          <div className="text-2xl flex items-center justify-left">
                            <span
                              className={`h-16 w-16 border border-solid border-border-variant inline-flex items-center justify-center  `}
                            >
                              <AiOutlineMinus />
                            </span>
                            <span className="h-16 min-w-40px border border-solid border-l-0 border-r-0 border-border-variant inline-flex items-center justify-center px-4">
                              {cartItem.quantity}
                            </span>
                            <span className="h-16 w-16 border border-solid border-border-variant inline-flex items-center justify-center cursor-pointer">
                              <AiOutlinePlus />
                            </span>
                          </div>
                        </div>
                        <div className="w-1/5 max-sm:hidden">
                          <span className="text-2xl font-bold text-red-500 flex">
                            {castToVND(
                              cartItem.productVariant.product.priceSale > 0
                                ? cartItem.productVariant.product.priceSale *
                                    cartItem.quantity
                                : cartItem.productVariant.product.price *
                                    cartItem.quantity
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Col>
        <Col xl={6} md={7} xs={0} className="max-sm:hidden">
          <div className="bg-bg-cart px-16 py-32 ml-4 max-lg:py-16 max-lg:px-4 ">
            <div className="mb-4">
              <h3 className="m-0 text-4xl">Đơn hàng</h3>
            </div>
            <div className="flex justify-between text-2xl mb-4 font-bold">
              <span>Giá gốc</span>
              <span>{castToVND(rootPrice())}</span>
            </div>
            <div className="flex justify-between text-2xl mb-16 font-bold max-lg:mb-8 ">
              <span>Tổng tiền</span>
              <span className=" text-red-600">{castToVND(totalPrice())}</span>
            </div>
            <div className="mb-10 max-lg:mb-8">
              <button
                className="bg-btn-order w-full flex items-center justify-center uppercase py-6 text-white text-2xl border-none outline-none rounded-xl cursor-pointer hover:bg-hover-btn-order"
                onClick={() => {
                  navigate(routes.checkOut);
                }}
              >
                Đặt hàng
              </button>
            </div>
            <div>
              <span>Áp dụng điểm tích lũy tại bước tiếp theo</span>
            </div>
          </div>
        </Col>
      </Row>
      {/* mobile */}
      <Row>
        <Col xl={0} md={0} xs={24}>
          <div className="static bottom-0 z-0 bg-bg-cart w-full p-8 mt-8">
            <div className="flex text-2xl mb-4">
              <span className="mr-4">Tổng:</span>
              <span>
                <b>{castToVND(totalPrice())}</b>
              </span>
            </div>
            <div className="mb-4">
              <button
                className="bg-btn-order w-full flex items-center justify-center uppercase py-6 text-white text-xl border-none outline-none rounded-xl cursor-pointer"
                onClick={() => {
                  navigate(routes.checkOut);
                }}
              >
                Đặt hàng
              </button>
            </div>
            <div>
              <span>Áp dụng điểm tích lũy tại bước tiếp theo</span>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  ) : (
    <div className="flex flex-col items-center justify-center mt-10">
      <span className="text-4xl font-semibold">
        Giỏ hàng của bạn hiện đang trống
      </span>
      <span className="mt-8">
        Xem thêm các sản phẩm của cửa hàng tại&nbsp;
        <b
          className="text-blue-500 text-3xl cursor-pointer"
          onClick={() => {
            navigate(routes.home);
          }}
        >
          đây
        </b>
      </span>
    </div>
  );
};

export default CartPage;
