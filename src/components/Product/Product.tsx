import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from './__product.module.scss';

import classNames from 'classnames/bind';
import { Col, Image, Modal, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { castToVND } from '../../utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const Product: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qtt, setQtt] = useState<number>(1);
  const [isActiveSize, setIsActiveSize] = useState<boolean>(false);
  const [isActiveColor, setIsActiveColor] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <React.Fragment>
      <Col xl={6} md={8} xs={12}>
        <div className={cx('item')}>
          <div className={cx('img')}>
            <Link to="">
              <img
                className="common-img"
                src="https://res.cloudinary.com/diot4imoq/image/upload/v1662016045/canifa/2ls22s018-sy038-2-thumb_n882ft.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className={cx('preview')} onClick={showModal}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
            <span>Xem trước</span>
          </div>
          {isModalVisible && (
            <Modal
              title={null}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              className="modal-product"
            >
              <div className={cx('container')}>
                <div className={cx('left')}>
                  <Swiper
                    modules={[Pagination]}
                    className={cx('my-swiper')}
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide>
                      <Image
                        src="https://cdn.shopify.com/s/files/1/0456/5070/6581/products/UXC72WA-2_x450.jpg?v=1657686129"
                        alt=""
                        className={cx('img')}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="https://cdn.shopify.com/s/files/1/0456/5070/6581/products/UXC72WA-3_x450.jpg?v=1657686130"
                        alt=""
                        className={cx('img')}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className={cx('right')}>
                  <div className={cx('name')}>
                    <Link to="">
                      Giày Thời Trang Nam New Balance XC-72 Shifted Lifestyle
                    </Link>
                  </div>
                  <div className={cx('price')}>
                    <span className={cx('current')}>{castToVND(3295000)}</span>
                    <span className={cx('sale')}>{castToVND(100000)}</span>
                  </div>
                  <div className={cx('colors')}>
                    <h3>Màu sắc</h3>
                    <div className={cx('wrap')}>
                      <div
                        className={cx('color', {
                          active: isActiveColor,
                        })}
                        onClick={() => {
                          setIsActiveColor(true);
                        }}
                      >
                        <span>WA</span>
                      </div>
                      <div className={cx('color')}>
                        <span>WA</span>
                      </div>
                    </div>
                  </div>
                  <div className={cx('sizes')}>
                    <h3>Kích thước</h3>
                    <div className={cx('wrap')}>
                      <div
                        className={cx('size', {
                          active: isActiveSize,
                        })}
                        onClick={() => {
                          setIsActiveSize(true);
                        }}
                      >
                        <span>US5</span>
                      </div>
                      <div className={cx('size')}>
                        <span>US6</span>
                      </div>
                      <div className={cx('size')}>
                        <span>US7</span>
                      </div>
                      <div className={cx('size')}>
                        <span>US8</span>
                      </div>
                    </div>
                  </div>
                  <div className={cx('qtt-cart')}>
                    <h3>Số lượng</h3>
                    <div className={cx('content')}>
                      <div className={cx('input-qtt')}>
                        <input
                          type="text"
                          value={qtt}
                          onChange={() => {}}
                          className={cx('value-qtt')}
                        />
                        <div className={cx('btn-qtt')}>
                          <MinusOutlined
                            className={cx('icon')}
                            onClick={() => {
                              if (qtt > 1) {
                                setQtt((prev) => prev - 1);
                              } else {
                                return 1;
                              }
                            }}
                          />
                          <PlusOutlined
                            className={cx('icon')}
                            onClick={() => {
                              setQtt(qtt + 1);
                            }}
                          />
                        </div>
                      </div>
                      <div className={cx('btn-add-to-cart')}>
                        <button>Thêm vào giỏ hàng</button>
                      </div>
                    </div>
                  </div>
                  <div className={cx('more-detail')}>
                    <Link to="">More Details</Link>
                  </div>
                </div>
              </div>
            </Modal>
          )}
          <div className={cx('name')}>
            <Link to="">
              <span>
                Giày chạy bộ nam hoka march gì mà đẹp thế kia kia kia kia kia
                Giày chạy bộ nam hoka march gì mà đẹp thế kia kia kia kia kia
              </span>
            </Link>
          </div>
          <div className={cx('price')}>
            <span>{castToVND(570000)}</span>
            <span className={cx('price-old')}>{castToVND(123000000)}</span>
          </div>
          <div className={cx('star')}>
            <Rate allowHalf defaultValue={5} />
          </div>
          <div className={cx('tags-name')}>
            <span>Mới</span>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default Product;
