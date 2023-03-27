import React, { useState, useEffect, useMemo } from 'react';
import styles from './__product.module.scss';
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Modal, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { castToVND } from '../../utils';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { IProduct } from '../../types/product';
import { IProductImage } from '../../types/productImage';
import { IProductVariant } from '../../types/productVariant';
import { IVariantValue } from '../../types/variantValue';
import { useDispatch, useSelector } from 'react-redux';
import {
  favoriteProductActions,
  favoriteProductSelector,
} from '../../redux/slice/favoriteProductSlice';
import { authSelector } from '../../redux/slice/authSlice';
import { cartActions } from '../../redux/slice/cartSlice';

const cx = classNames.bind(styles);

interface Props {
  product?: IProduct;
}

const Product: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(favoriteProductSelector);
  const { user } = useSelector(authSelector);
  const navigate = useNavigate();

  const checkFavoriteProduct = useMemo(() => {
    return products.rows.some((item) => item.productId === product?.id);
  }, [product?.id, products.rows]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<IVariantValue>();
  const [selectedSize, setSelectedSize] = useState<IVariantValue>();
  const [colors, setColors] = useState<IVariantValue[]>([]);
  const [sizes, setSizes] = useState<IVariantValue[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

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

  const handleDeleteFavoriteProduct = (item: IProduct) => {
    dispatch(
      favoriteProductActions.deleteFavoriteProduct({
        token: user.accessToken,
        dispatch,
        productId: item.id,
      })
    );
  };

  const handleAddToFavoriteProduct = (item: IProduct) => {
    dispatch(
      favoriteProductActions.createFavoriteProduct({
        token: user.accessToken,
        dispatch,
        data: {
          productId: item.id,
        },
      })
    );
  };

  const handleAddToCart = (product: IProduct) => {
    if (product && selectedColor && selectedSize) {
      const productVariant = product.productVariants.find((item) =>
        item.variantValues.every(
          (variantValue) =>
            variantValue.id === selectedColor.id ||
            variantValue.id === selectedSize.id
        )
      );
      let formData;
      if (productVariant) {
        formData = {
          productVariantId: productVariant.id,
          quantity: quantity,
        };
        dispatch(
          cartActions.addToCart({
            token: user.accessToken,
            dispatch,
            navigate,
            data: formData,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (product && product.productVariants) {
      const colors: IVariantValue[] = [];
      const sizes: IVariantValue[] = [];
      product.productVariants.forEach((data: IProductVariant) => {
        data.variantValues.forEach((variantValue: IVariantValue) => {
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
      colors.sort((a, b) => a.id - b.id);
      setColors(colors);
      setSizes(sizes);
    }
  }, [product]);

  if (!product) return <></>;
  return (
    <React.Fragment>
      <div className={cx('item')}>
        <div className={cx('img')}>
          <Link to={`/${product.slug}`}>
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
                  <Link to={`/${product.slug}`}>{product.name}</Link>
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
                            className={cx('color', {
                              active: selectedColor?.id === color.id,
                            })}
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
                <div className="my-4 flex items-center">
                  <span
                    className={`h-16 w-16 border border-solid border-border-variant inline-flex items-center justify-center ${
                      quantity > 1 ? 'cursor-pointer' : 'cursor-not-allowed'
                    } `}
                    onClick={() => {
                      setQuantity(quantity - 1);
                    }}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span className="h-16 min-w-40px border border-solid border-l-0 border-r-0 border-border-variant inline-flex items-center justify-center px-4">
                    {quantity}
                  </span>
                  <span
                    className="h-16 w-16 border border-solid border-border-variant inline-flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    <AiOutlinePlus />
                  </span>
                </div>
                <div>
                  <div>
                    <button
                      className="bg-btn-order w-ful flex items-center justify-center uppercase py-6 px-24 text-white text-2xl border-none outline-none rounded-xl cursor-pointer hover:bg-hover-btn-order"
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
                <div className={cx('more-detail')}>
                  <Link to={`/${product.slug}`}>Xem chi tiết sản phẩm</Link>
                </div>
              </div>
            </div>
          </Modal>
        )}
        <div className={cx('name')}>
          <Link to={`/${product.slug}`}>
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
        {user.user && (
          <div className={cx('tags-name')}>
            <div
              className={cx('wish-list', {
                active: checkFavoriteProduct,
              })}
            >
              {checkFavoriteProduct === true ? (
                <Tooltip placement="bottomRight" title="Xóa khỏi yêu thích">
                  <div
                    onClick={() => {
                      handleDeleteFavoriteProduct(product);
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip placement="bottomRight" title="Yêu thích">
                  <div
                    onClick={() => {
                      handleAddToFavoriteProduct(product);
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tooltip>
              )}
            </div>
          </div>
        )}
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
