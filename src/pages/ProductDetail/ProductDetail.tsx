import React, { useState } from 'react';
import { Breadcrumb, Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import { castToVND } from '../../utils';
import {
  AiOutlineCheck,
  AiFillHeart,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';

const ProductDetail: React.FC = () => {
  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const [indexColor, setIndexColor] = useState<number>();
  const [indexSize, setIndexSize] = useState<number>();
  const [isDes, setIsDes] = useState<boolean>(true);
  const [isMaterial, setIsMaterial] = useState<boolean>(false);
  const [isGuide, setIsGuide] = useState<boolean>(false);
  const colors = ['Xanh', 'Đỏ', 'Tím', 'Vàng', 'Lục'];
  const sizes = [100, 111, 222, 333, 444, 555];

  return (
    <main className="product-detail mb-12 max-sm:mt-24 max-lg:my-12">
      <div className="p-100 max-sm:px-12">
        <div className="container">
          <section className="breadcrumb max-sm:hidden">
            <Breadcrumb className="my-8">
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/">Nam</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/">Đồ Mặc nhà</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Áo mặc nhà nam</Breadcrumb.Item>
            </Breadcrumb>
          </section>
          <section>
            <Row gutter={[16, 16]}>
              <Col xl={12} md={12} xs={24}>
                <Swiper
                  modules={[Pagination]}
                  className="my-swiper"
                  pagination={{ clickable: true }}
                >
                  <SwiperSlide>
                    <img
                      className="common-img"
                      src="https://canifa.com/img/1000/1500/resize/2/l/2ls22s018-sy038-1.jpg"
                      alt=""
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className="common-img"
                      src="https://canifa.com/img/1000/1500/resize/2/l/2ls22s018-sy038-2-thumb.jpg"
                      alt=""
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className="common-img"
                      src="https://canifa.com/img/1000/1500/resize/2/l/2ls22s018-sy038-110-1-ghep-u.jpg"
                      alt=""
                    />
                  </SwiperSlide>
                </Swiper>
              </Col>
              <Col xl={12} md={12} xs={24}>
                <div>
                  <div className="text-4xl text-name-product font-bold mb-4">
                    <span>Bộ mặc nhà bé trai</span>
                  </div>
                  <div className="text-2xl mb-4">
                    <span>
                      MÃ SP: <b>2LS22S018</b>
                    </span>
                  </div>
                  <div className="flex items-center text-3xl mb-4">
                    <span className="mr-16">{castToVND(200000000)}</span>
                    <span className="text-root-price line-through">
                      {castToVND(200000000)}
                    </span>
                  </div>
                  <div>
                    <h3>Màu sắc:</h3>
                    <div className="flex flex-wrap">
                      {colors.map((color, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => {
                              setIndexColor(index);
                            }}
                            className="w-20 h-20 border-solid border border-slate-500 flex text-center items-center justify-center cursor-pointer mr-4 mb-4"
                          >
                            {color}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h3>Kích thước:</h3>
                    <div className="flex flex-wrap">
                      {sizes.map((size, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => {
                              setIndexSize(index);
                            }}
                            className="w-20 h-20 border-solid border border-slate-500 flex text-center items-center justify-center cursor-pointer mr-4 mb-4"
                          >
                            {size}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold">Hướng dẫn chọn size:</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <AiOutlineCheck />
                      <p className="m-0 pl-4">
                        Miễn phí giao hàng Cho đơn hàng từ <b>499.000đ</b>
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <AiOutlineCheck />
                      <p className="m-0 pl-4">
                        Đổi trả miễn phí trong vòng <b>30 ngày</b> kể từ ngày
                        mua
                      </p>
                    </div>
                  </div>
                  <div className="my-8">
                    <div className="">
                      <button className="w-45 border-none outline-none bg-name-product cursor-pointer max-lg:w-96 max-sm:w-96">
                        <span className="flex justify-center py-6 text-3xl uppercase text-white font-light">
                          Thêm vào giỏ hàng
                        </span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-4">
                      <span className="font-bold">Mô tả</span>
                      {isDes ? (
                        <AiOutlineMinus
                          onClick={() => {
                            setIsDes(!isDes);
                          }}
                          className="cursor-pointer"
                        />
                      ) : (
                        <AiOutlinePlus
                          onClick={() => {
                            setIsDes(!isDes);
                          }}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                    {isDes ? (
                      <div className="mb-4">
                        <span>
                          Áo phông basic, cổ tròn, tay cộc, in chữ nhỏ. Chất
                          liệu 100% cotton Áo phông basic, cổ tròn, tay cộc, in
                          chữ nhỏ. Chất liệu 100% cotton
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="flex justify-between mb-4">
                      <span className="font-bold">Chất liệu</span>
                      {isMaterial ? (
                        <AiOutlineMinus
                          onClick={() => {
                            setIsMaterial(!isMaterial);
                          }}
                          className="cursor-pointer"
                        />
                      ) : (
                        <AiOutlinePlus
                          onClick={() => {
                            setIsMaterial(!isMaterial);
                          }}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                    {isMaterial ? (
                      <div className="mb-4">
                        <span>100% cotton</span>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="flex justify-between mb-4">
                      <span className="font-bold">Hướng dẫn sử dụng</span>
                      {isGuide ? (
                        <AiOutlineMinus
                          onClick={() => {
                            setIsGuide(!isGuide);
                          }}
                          className="cursor-pointer"
                        />
                      ) : (
                        <AiOutlinePlus
                          onClick={() => {
                            setIsGuide(!isGuide);
                          }}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                    {isGuide ? (
                      <div className="mb-4">
                        <span>
                          Giặt máy ở chế độ nhẹ, nhiệt độ thường. Không sử dụng
                          hóa chất tẩy có chứa Clo. Phơi trong bóng mát. Sấy
                          thùng, chế độ nhẹ nhàng. Là ở nhiệt độ trung bình 150
                          độ C. Giặt với sản phẩm cùng màu. Không là lên chi
                          tiết trang trí.
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
