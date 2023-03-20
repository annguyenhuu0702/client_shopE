import React, { useState, useEffect } from 'react';
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
import { IProductVariant } from '../../types/productVariant';
import { IVariantValue } from '../../types/variantValue';

const cx = classNames.bind(styles);

interface Props {
  product?: IProduct;
}

const Product: React.FC<Props> = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<IVariantValue>();
  const [selectedSize, setSelectedSize] = useState<IVariantValue>();
  const [colors, setColors] = useState<IVariantValue[]>([]);
  const [sizes, setSizes] = useState<IVariantValue[]>([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelectedColor = (color: IVariantValue) => {
    setSelectedColor(color);
  };

  const handleSelectedSize = (size: IVariantValue) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    if (product) {
      const colors: IVariantValue[] = [];
      const sizes: IVariantValue[] = [];
      product.productVariants.forEach((data: IProductVariant) => {
        data.variantValues?.forEach((variantValue) => {
          if (variantValue.variantId === 1) {
            let index = sizes.findIndex((size) => size.id === variantValue.id);
            if (index === -1) {
              sizes.push(variantValue);
            }
          } else if (variantValue.variantId === 2) {
            let index = colors.findIndex((size) => size.id === variantValue.id);
            if (index === -1) {
              colors.push(variantValue);
            }
          }
        });
      });
      sizes.sort((a, b) => a.id - b.id);
      setColors(colors);
      setSizes(sizes);
    }
  }, [product]);

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
                  {[...product.productImages]
                    .sort((a, b) => a.variantValueId - b.variantValueId)
                    .map((item: IProductImage) => {
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
                {colors.length > 0 && (
                  <div className={cx('colors')}>
                    <h3>Màu sắc:</h3>
                    <div className={cx('wrap')}>
                      {colors.map((color) => {
                        return (
                          <div
                            key={color.id}
                            className={cx('color')}
                            onClick={() => {
                              handleSelectedColor(color);
                            }}
                          >
                            <span>{color.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {sizes.length > 0 && (
                  <div className={cx('sizes')}>
                    <h3>Kích thước:</h3>
                    <div className={cx('wrap')}>
                      {sizes.map((size) => {
                        return (
                          <div
                            key={size.id}
                            className={cx('size', {
                              active: selectedSize?.id === size.id,
                            })}
                            onClick={() => {
                              handleSelectedSize(size);
                            }}
                          >
                            <span>{size.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className={cx('qtt-cart')}>
                  <h3>Số lượng</h3>
                  <div className={cx('content')}>
                    <div className={cx('input-qtt')}>
                      <input
                        type="text"
                        value={quantity}
                        onChange={() => {}}
                        className={cx('value-qtt')}
                      />
                      <div className={cx('btn-qtt')}>
                        <MinusOutlined
                          className={cx('icon')}
                          onClick={() => {
                            if (quantity > 1) {
                              setQuantity((prev) => prev - 1);
                            } else {
                              return 1;
                            }
                          }}
                        />
                        <PlusOutlined
                          className={cx('icon')}
                          onClick={() => {
                            setQuantity(quantity + 1);
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
