import React, { useState } from 'react';
import styles from './__productDetail.module.scss';
import classNames from 'classnames/bind';

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

const cx = classNames.bind(styles);

const ProductDetail: React.FC = () => {
  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const [indexColor, setIndexColor] = useState<number>();
  const [indexSize, setIndexSize] = useState<number>();
  const [isDes, setIsDes] = useState<boolean>(true);
  const [isMaterial, setIsMaterial] = useState<boolean>(false);
  const [isGuide, setIsGuide] = useState<boolean>(false);
  const colors = [
    'Xanh',
    'Đỏ',
    'Tím',
    'Vàng',
    'Lục',
    'Lam',
    'Chàm',
    'Tím',
    'Chàm',
    'Tím',
    'Chàm',
    'Tím',
    'Chàm',
    'Tím',
  ];
  const sizes = [100, 111, 222, 333, 444, 555];

  return (
    <main className={cx('product-detail')}>
      <div className="p-100">
        <div className={cx('container')}>
          <section className={cx('breadcrumb')}>
            <Breadcrumb>
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
          <section className={cx('product')}>
            <Row
              gutter={[16, 16]}
              style={{
                flexWrap: 'nowrap',
              }}
            >
              <Col xl={14} md={14} className={cx('left')}>
                <Swiper
                  modules={[Pagination]}
                  className={cx('my-swiper')}
                  pagination={{ clickable: true }}
                >
                  <SwiperSlide>
                    <img
                      src="https://canifa.com/img/1000/1500/resize/2/l/2ls22s018-sy038-1.jpg"
                      alt=""
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="https://canifa.com/img/1000/1500/resize/2/l/2ls22s018-sy038-2-thumb.jpg"
                      alt=""
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="https://canifa.com/img/1000/1500/resize/2/l/2ls22s018-sy038-110-1-ghep-u.jpg"
                      alt=""
                    />
                  </SwiperSlide>
                </Swiper>
              </Col>
              <Col xl={10} md={10} className={cx('right')}>
                <div className={cx('info')}>
                  <div
                    className={cx('add-wishlist')}
                    onClick={() => {
                      setIsWishlist(!isWishlist);
                    }}
                  >
                    <AiFillHeart className={isWishlist ? cx('active') : ''} />
                    {!isWishlist ? (
                      <span>Thêm vào yêu thích</span>
                    ) : (
                      <span>Xóa khỏi yêu thích</span>
                    )}
                  </div>
                  <div className={cx('name')}>
                    <span>Bộ mặc nhà bé trai</span>
                  </div>
                  <div className={cx('sku')}>
                    <span>
                      MÃ SP: <b>2LS22S018</b>
                    </span>
                  </div>
                  <div className={cx('price')}>
                    <span>{castToVND(200000000)}</span>
                    <span className={cx('root-price')}>
                      {castToVND(200000000)}
                    </span>
                  </div>
                  <div className={cx('colors')}>
                    <h3>Màu sắc:</h3>
                    <div className={cx('list-color')}>
                      {colors.map((color, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => {
                              setIndexColor(index);
                            }}
                            className={indexColor === index ? cx('active') : ''}
                          >
                            {color}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className={cx('sizes')}>
                    <h3>Kích thước:</h3>
                    <div className={cx('list-size')}>
                      {sizes.map((size, index) => {
                        return (
                          <span
                            className={indexSize === index ? cx('active') : ''}
                            key={index}
                            onClick={() => {
                              setIndexSize(index);
                            }}
                          >
                            {size}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className={cx('guide')}>
                    <span>Hướng dẫn chọn size</span>
                  </div>
                  <div className={cx('services')}>
                    <div className={cx('service')}>
                      <AiOutlineCheck />
                      <p>
                        Miễn phí giao hàng Cho đơn hàng từ <b>499.000đ</b>
                      </p>
                    </div>
                    <div className={cx('service')}>
                      <AiOutlineCheck />
                      <p>
                        Đổi trả miễn phí trong vòng <b>30 ngày</b> kể từ ngày
                        mua
                      </p>
                    </div>
                  </div>
                  <div className={cx('options-actions')}>
                    <div className={cx('add-cart')}>
                      <Button type="primary">Thêm vào giỏ hàng</Button>
                    </div>
                  </div>
                  <div className={cx('description')}>
                    <div className={cx('des')}>
                      <span>Mô tả</span>
                      {isDes ? (
                        <AiOutlineMinus
                          onClick={() => {
                            setIsDes(!isDes);
                          }}
                        />
                      ) : (
                        <AiOutlinePlus
                          onClick={() => {
                            setIsDes(!isDes);
                          }}
                        />
                      )}
                    </div>
                    {isDes ? (
                      <div className={cx('content')}>
                        <span>
                          Áo phông basic, cổ tròn, tay cộc, in chữ nhỏ. Chất
                          liệu 100% cotton Áo phông basic, cổ tròn, tay cộc, in
                          chữ nhỏ. Chất liệu 100% cotton
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className={cx('des')}>
                      <span>Chất liệu</span>
                      {isMaterial ? (
                        <AiOutlineMinus
                          onClick={() => {
                            setIsMaterial(!isMaterial);
                          }}
                        />
                      ) : (
                        <AiOutlinePlus
                          onClick={() => {
                            setIsMaterial(!isMaterial);
                          }}
                        />
                      )}
                    </div>
                    {isMaterial ? (
                      <div className={cx('content')}>
                        <span>100% cotton</span>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className={cx('des')}>
                      <span>Hướng dẫn sử dụng</span>
                      {isGuide ? (
                        <AiOutlineMinus
                          onClick={() => {
                            setIsGuide(!isGuide);
                          }}
                        />
                      ) : (
                        <AiOutlinePlus
                          onClick={() => {
                            setIsGuide(!isGuide);
                          }}
                        />
                      )}
                    </div>
                    {isGuide ? (
                      <div className={cx('content')}>
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
