import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useTitle } from '../../hooks/useTitle';
import { authSelector } from '../../redux/slice/authSlice';
import { cartActions } from '../../redux/slice/cartSlice';
import { castToVND } from '../../utils';

const CartPage: React.FC = () => {
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      cartActions.getByUser({
        token: user.accessToken,
        dispatch,
      })
    );
  }, [dispatch, user.accessToken]);

  const navigate = useNavigate();
  useTitle('Giỏ hàng');
  return (
    <main className="p-50 my-20 max-lg:px-0 max-sm:p-0 max-sm:mt-24 ">
      <Row className="lg:mb-20 ">
        <Col xl={18} md={16} xs={24}>
          <div className="px-16 py-32 bg-bg-cart max-lg:p-10 max-sm:p-8">
            <div className="bg-white inline-flex text-lg font-sans rounded-xl mb-10 ">
              <h2 className="m-0 font-normal flex items-center p-5 ">
                <span className="p-4 rounded-full bg-teal-300 flex items-center justify-center mr-4">
                  <FaShippingFast className="text-white" />
                </span>
                Bạn đủ điều kiện để nhận miễn phí vận chuyển
              </h2>
            </div>
            <div className="pb-8">
              <h2 className="m-0 text-4xl ">(2) sản phẩm</h2>
            </div>
            <div className="w-full">
              <div className="w-full flex items-center text-left bg-name-product text-gray-200 text-2xl p-3 max-sm:hidden">
                <span className="w-2/5 uppercase">Sản phẩm</span>
                <span className="w-1/5 uppercase">Giá tiền</span>
                <span className="w-1/5 uppercase">Số lượng</span>
                <span className="w-1/5 uppercase">Tổng tiền</span>
              </div>
              <div className="w-full flex text-lef mt-8 pb-8 border-solid border-0 border-b-2 border-border-layout-cart">
                <div className="w-2/5 max-lg:mr-2 max-sm:w-3/4">
                  <div className="flex ">
                    <div className="w-32">
                      <img
                        className="w-full object-cover"
                        src="https://canifa.com/img/210/300/resize/2/o/2ot22w011-sb148-1-thumb.webp"
                        alt=""
                      />
                    </div>
                    <div className="w-full pl-4 flex flex-col justify-between">
                      <div className="text-2xl">
                        <a
                          href=" "
                          className="text-gray-500 max-lg:line-clamp-1 max-sm:line-clamp-1"
                        >
                          Áo khoác nỉ có mũ bé trai
                        </a>
                      </div>
                      <div className="text-2xl">
                        <span className="text-black">90 / Xanh</span>
                      </div>
                      <div>
                        <AiOutlineDelete className="inline-block cursor-pointer hover:text-red-500 " />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/5 max-sm:hidden">
                  <span className="text-2xl">{castToVND(499999)}</span>
                </div>
                <div className="w-1/5 max-sm:w-1/4 max-sm:flex max-sm:items-start justify-end">
                  <div className="text-2xl flex items-center justify-left">
                    <span className="flex rounded-full border border-solid border-gray-400 p-1 mr-6 cursor-pointer">
                      <AiOutlineMinus />
                    </span>
                    <span>2</span>
                    <span className="flex rounded-full border border-solid border-gray-400 p-1 ml-6 cursor-pointer">
                      <AiOutlinePlus />
                    </span>
                  </div>
                </div>
                <div className="w-1/5 max-sm:hidden">
                  <span className="text-2xl flex">{castToVND(499999)}</span>
                </div>
              </div>
              <div className="w-full flex text-lef mt-8 pb-8 border-solid border-0 border-b-2 border-border-layout-cart">
                <div className="w-2/5 max-lg:mr-2 max-sm:w-3/4">
                  <div className="flex ">
                    <div className="w-32">
                      <img
                        className="w-full object-cover"
                        src="https://canifa.com/img/210/300/resize/2/o/2ot22w011-sb148-1-thumb.webp"
                        alt=""
                      />
                    </div>
                    <div className="w-full pl-4 flex flex-col justify-between">
                      <div className="text-2xl">
                        <a
                          href=" "
                          className="text-gray-500 max-lg:line-clamp-1 max-sm:line-clamp-1"
                        >
                          Áo khoác nỉ có mũ bé trai
                        </a>
                      </div>
                      <div className="text-2xl">
                        <span className="text-black">90 / Xanh</span>
                      </div>
                      <div>
                        <AiOutlineDelete className="inline-block cursor-pointer hover:text-red-500 " />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/5 max-sm:hidden">
                  <span className="text-2xl">{castToVND(499999)}</span>
                </div>
                <div className="w-1/5 max-sm:w-1/4 max-sm:flex max-sm:items-start justify-end">
                  <div className="text-2xl flex items-center justify-left">
                    <span className="flex rounded-full border border-solid border-gray-400 p-1 mr-6 cursor-pointer">
                      <AiOutlineMinus />
                    </span>
                    <span>2</span>
                    <span className="flex rounded-full border border-solid border-gray-400 p-1 ml-6 cursor-pointer">
                      <AiOutlinePlus />
                    </span>
                  </div>
                </div>
                <div className="w-1/5 max-sm:hidden">
                  <span className="text-2xl flex">{castToVND(499999)}</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={6} md={8} xs={0} className="max-sm:hidden">
          <div className="bg-bg-cart px-16 py-32 ml-4 max-lg:py-16 max-lg:px-4 ">
            <div className="mb-4">
              <h3 className="m-0 text-4xl">Đơn hàng</h3>
            </div>
            <div className="flex justify-between text-2xl text-gray-500 mb-4">
              <span>Giá gốc</span>
              <span>{castToVND(1000000)}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold mb-16 max-lg:mb-8 ">
              <span>Tổng tiền</span>
              <span>{castToVND(10000000000)}</span>
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
              <span>Áp dụng mã giảm giá tại bước tiếp theo</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={0} md={0} xs={24}>
          <div className="static bottom-0 z-0 bg-bg-cart w-full p-8 mt-8">
            <div className="flex text-2xl mb-4">
              <span className="mr-4">Tổng:</span>
              <span>
                <b>{castToVND(1000000)}</b>
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
              <span>Áp dụng mã giảm giá tại bước tiếp theo</span>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default CartPage;
