import React, { useState } from 'react';
import styles from './__product.module.scss';
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Modal, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { castToVND } from '../../utils';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { IProduct } from '../../types/product';
import { IProductImage } from '../../types/productImage';

const cx = classNames.bind(styles);

interface Props {
  product?: IProduct;
}

const Product: React.FC<Props> = ({ product }) => {
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
  if (!product) return <></>;
  return (
    <React.Fragment>
      <div className={cx('item')}>
        <div className={cx('img')}>
          <Link to={`/san-pham/${product.slug}`}>
            <img className="common-img" src={product.thumbnail} alt="" />
          </Link>
        </div>
        <div className={cx('preview')} onClick={showModal}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
          <span>Xem trước</span>
        </div>
        {isModalVisible && (
          <Modal
            title={null}
            open={isModalVisible}
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
                  {product.productImages.map((item: IProductImage) => {
                    console.log(product.productImages);
                    return (
                      <SwiperSlide
                        className="max-sm:flex max-sm:items-center max-lg:flex max-lg:items-center"
                        key={item.id}
                      >
                        <div>
                          <Image src={item.path} alt="" />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className={cx('right')}>
                <div className={cx('name')}>
                  <Link to={`/san-pham/${product.slug}`}>{product.name}</Link>
                </div>
                <div className={cx('price')}>
                  <span className={cx('current')}>
                    {castToVND(product.price)}
                  </span>
                  {product.priceSale > 0 && (
                    <span className={cx('sale')}>
                      {castToVND(product.priceSale)}
                    </span>
                  )}
                </div>
                <div className={cx('colors')}>
                  <h3>Màu sắc:</h3>
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
                  <h3>Kích thước:</h3>
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
          <Link to={`/san-pham/${product.slug}`}>
            <span className="hover:text-btn-order transition ease-in-out delay-75">
              {product.name}
            </span>
          </Link>
        </div>
        <div className={cx('price')}>
          <span>{castToVND(product.price)}</span>
          {product.priceSale > 0 && (
            <span className={cx('price-old')}>
              {castToVND(product.priceSale)}
            </span>
          )}
        </div>
        <div className={cx('tags-name')}>
          <div className={cx('wish-list')}>
            <Tooltip placement="bottomRight" title="Yêu thích">
              <FontAwesomeIcon icon={faHeart} />
            </Tooltip>
          </div>
        </div>
        {product.priceSale !== 0 && (
          <div className={cx('tags-percent')}>
            <span>
              -{Math.floor((product.priceSale / product.price) * 100)}%
            </span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Product;
