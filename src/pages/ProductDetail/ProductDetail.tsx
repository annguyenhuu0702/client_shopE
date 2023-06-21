import { Breadcrumb, Col, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { castToVND } from '../../utils';

import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';

import { useTitle } from '../../hooks/useTitle';
import { authSelector } from '../../redux/slice/authSlice';
import { cartActions } from '../../redux/slice/cartSlice';
import { commentActions } from '../../redux/slice/commentSlice';
import {
  productActions,
  productSelector,
} from '../../redux/slice/productSlice';
import { IProductImage } from '../../types/productImage';
import { IProductVariant } from '../../types/productVariant';
import { IVariantValue } from '../../types/variantValue';
import CommentProduct from './CommentProduct/CommentProduct';
import ProductRelated from './ProductRelated/ProductRelated';

const ProductDetail: React.FC = ({ children }: any) => {
  const { user } = useSelector(authSelector);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProductClient, productsRelatedClient, isLoadingClient } =
    useSelector(productSelector);

  const [isDes, setIsDes] = useState<boolean>(true);
  const [isMaterial, setIsMaterial] = useState<boolean>(false);
  const [isGuide, setIsGuide] = useState<boolean>(false);

  // chọn màu với kích thước
  const [selectedColor, setSelectedColor] = useState<IVariantValue>();
  const [selectedSize, setSelectedSize] = useState<IVariantValue>();

  // state render color size
  const [colors, setColors] = useState<IVariantValue[]>([]);
  const [sizes, setSizes] = useState<IVariantValue[]>([]);

  // chọn hình
  const [selectedImage, setSelectedImage] = useState<string>(() => {
    return currentProductClient ? currentProductClient.thumbnail : '';
  });

  // quantity add to cart
  const [quantity, setQuantity] = useState<number>(1);

  const handleSelectedColor = (color: IVariantValue) => {
    setSelectedColor(color);
  };

  const handleSelectedSize = (size: IVariantValue) => {
    setSelectedSize(size);
  };

  const handleSelectedImage = (item: IProductImage) => {
    setSelectedImage(item.path);
  };

  const handleAddToCart = () => {
    if (!selectedSize && selectedColor) {
      message.open({
        type: 'warning',
        content: 'Vui lòng chọn kích thước sản phẩm',
      });
    }
    if (selectedSize && !selectedColor) {
      message.open({
        type: 'warning',
        content: 'Vui lòng chọn màu sắc sản phẩm',
      });
    }
    if (!selectedSize && !selectedColor) {
      message.open({
        type: 'warning',
        content: 'Vui lòng chọn kích thước và màu sắc sản phẩm',
      });
    }
    if (currentProductClient && selectedColor && selectedSize) {
      const productVariant = currentProductClient.productVariants.find((item) =>
        item.variantValues.every(
          (variantValue) =>
            variantValue.id === selectedColor.id ||
            variantValue.id === selectedSize.id
        )
      );
      let formData;
      if (productVariant) {
        if (productVariant.inventory < quantity) {
          message.warning({
            type: 'warning',
            content: 'Số lượng tồn không đủ!',
          });
        } else {
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
    }
  };

  // khách chưa đăng nhập
  const handleByNow = () => {
    if (!selectedSize && selectedColor) {
      message.open({
        type: 'warning',
        content: 'Vui lòng chọn kích thước sản phẩm',
      });
    }
    if (selectedSize && !selectedColor) {
      message.open({
        type: 'warning',
        content: 'Vui lòng chọn màu sắc sản phẩm',
      });
    }
    if (!selectedSize && !selectedColor) {
      message.open({
        type: 'warning',
        content: 'Vui lòng chọn kích thước và màu sắc sản phẩm',
      });
    }
    if (currentProductClient && selectedColor && selectedSize) {
      const productVariant = currentProductClient.productVariants.find((item) =>
        item.variantValues.every(
          (variantValue) =>
            variantValue.id === selectedColor.id ||
            variantValue.id === selectedSize.id
        )
      );
      let formData;
      if (productVariant) {
        if (productVariant.inventory < quantity) {
          message.warning({
            type: 'warning',
            content: 'Số lượng tồn không đủ!',
          });
        } else {
          formData = {
            productVariant,
            quantity: quantity,
          };
          localStorage.setItem('order', JSON.stringify(formData));
          navigate('/checkout');
        }
      }
    }
  };

  // lấy sản phẩm theo slug
  useEffect(() => {
    if (slug) {
      dispatch(
        productActions.getProductBySlugClient({
          slug,
        })
      );
    }
  }, [dispatch, slug]);

  // lấy size với color để render
  useEffect(() => {
    if (currentProductClient && currentProductClient.productVariants) {
      const colors: IVariantValue[] = [];
      const sizes: IVariantValue[] = [];
      currentProductClient.productVariants.forEach((data: IProductVariant) => {
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
  }, [currentProductClient]);

  // set hình ảnh mặc định
  useEffect(() => {
    if (currentProductClient) {
      setSelectedImage(currentProductClient.thumbnail);
    }
  }, [currentProductClient]);

  // bình luận
  useEffect(() => {
    if (currentProductClient) {
      dispatch(
        commentActions.getAllCommentByProduct({
          productId: currentProductClient.id,
        })
      );
    }
  }, [currentProductClient, dispatch, user.accessToken]);

  useTitle(currentProductClient?.name);

  if (!currentProductClient) return <></>;

  return (
    <main className="product-detail mb-12 max-sm:mt-24 max-lg:my-12">
      {isLoadingClient && <Loading />}
      <div className="p-100 max-sm:px-12">
        <div className="container">
          <section className="breadcrumb max-sm:hidden">
            <Breadcrumb className="my-8">
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link
                  to={`/category/${currentProductClient.productCategory.collection.category.slug}`}
                >
                  {
                    currentProductClient.productCategory.collection.category
                      .name
                  }
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link
                  to={`/product-category/${currentProductClient.productCategory.slug}`}
                >
                  {currentProductClient.productCategory.name}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{currentProductClient.name}</Breadcrumb.Item>
            </Breadcrumb>
          </section>
          <section>
            <Row gutter={[16, 16]}>
              <Col
                xl={10}
                md={12}
                xs={24}
                className="h-700 max-sm:h-full max-lg:h-full"
              >
                <Swiper
                  className="my-swiper"
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  // onSlideChange, chọn ảnh thì slide nhỏ active theo
                  onSlideChange={(swiperCore) => {
                    const { activeIndex } = swiperCore;
                    setSelectedImage(
                      [...currentProductClient.productImages].sort(
                        (a, b) => a.variantValueId - b.variantValueId
                      )[activeIndex].path
                    );
                  }}
                >
                  {[...currentProductClient.productImages]
                    .sort((a, b) => a.variantValueId - b.variantValueId)
                    .map((item) => {
                      return (
                        <SwiperSlide key={item.id}>
                          <img
                            className="common-img"
                            src={selectedImage}
                            alt={currentProductClient.name}
                          />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </Col>
              <Col xl={2} md={0} xs={0}>
                <div className="h-700 overflow-y-auto">
                  {[...currentProductClient.productImages]
                    .sort((a, b) => a.variantValueId - b.variantValueId)
                    .map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="pb-2 pr-1"
                          onClick={() => {
                            handleSelectedImage(item);
                          }}
                        >
                          <img
                            className={`common-img ${
                              item.path === selectedImage
                                ? 'border border-solid'
                                : ''
                            }`}
                            src={item.path}
                            alt={currentProductClient.name}
                          />
                        </div>
                      );
                    })}
                </div>
              </Col>
              <Col xl={12} md={12} xs={24}>
                <div className="ml-10 max-sm:ml-0 max-lg:0">
                  <div className="text-4xl text-name-product font-bold mb-4">
                    <span>{currentProductClient.name}</span>
                  </div>
                  <div className="text-2xl mb-4">
                    <span>
                      MÃ SP: <b>{currentProductClient.code}</b>
                    </span>
                  </div>
                  {currentProductClient?.priceSale > 0 ? (
                    <div className="flex items-center text-3xl mb-4">
                      {currentProductClient.priceSale > 0 && (
                        <span className="mr-8">
                          {castToVND(currentProductClient.priceSale)}
                        </span>
                      )}
                      <span className="text-root-price line-through">
                        {castToVND(currentProductClient.price)}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-3xl mb-4">
                      <span className="text-black">
                        {castToVND(currentProductClient.price)}
                      </span>
                    </div>
                  )}
                  {colors.length > 0 && (
                    <div>
                      <h3>Màu sắc</h3>
                      <div className="flex flex-wrap gap-4">
                        {colors.map((color, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                handleSelectedColor(color);
                              }}
                              className={
                                selectedColor?.id === color.id
                                  ? 'min-w-40px h-16 border border-solid flex text-center items-center justify-center cursor-pointer px-4'
                                  : 'min-w-40px h-16 border border-solid border-border-variant flex text-center items-center justify-center cursor-pointer px-4'
                              }
                            >
                              {color.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {sizes.length > 0 && (
                    <div>
                      <h3 className="my-2">Kích thước</h3>
                      <div className="flex flex-wrap gap-4">
                        {sizes.map((size, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                handleSelectedSize(size);
                              }}
                              className={
                                selectedSize?.id === size.id
                                  ? 'min-w-40px h-16 border border-solid flex text-center items-center justify-center cursor-pointer px-4'
                                  : 'min-w-40px h-16 border border-solid border-border-variant flex text-center items-center justify-center cursor-pointer px-4'
                              }
                            >
                              {size.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {/* <div className="my-4">
                    <span className="font-bold cursor-pointer">
                      Hướng dẫn chọn size:
                    </span>
                  </div> */}
                  <div className="my-4">
                    <span className="font-bold cursor-pointer">Số lượng</span>
                  </div>
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
                    <input
                      value={quantity}
                      onChange={(e: any) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setQuantity(+value);
                      }}
                      className="flex text-center h-16 w-32 border border-solid border-l-0 border-r-0 border-border-variant px-4 outline-none"
                    />

                    <span
                      className="h-16 w-16 border border-solid border-border-variant inline-flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                    >
                      <AiOutlinePlus />
                    </span>
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
                  {user.user ? (
                    <div className="my-8">
                      <div
                        className="inline-block"
                        onClick={() => {
                          handleAddToCart();
                        }}
                      >
                        <button className="bg-btn-order flex items-center justify-center uppercase py-6 px-20 text-white text-2xl border-none outline-none rounded-xl cursor-pointer hover:bg-hover-btn-order">
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="my-8">
                      <div
                        className="inline-block"
                        onClick={() => {
                          handleByNow();
                        }}
                      >
                        <button className="bg-btn-order flex items-center justify-center uppercase py-6 px-20 text-white text-2xl border-none outline-none rounded-xl cursor-pointer hover:bg-hover-btn-order">
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  )}
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
                          {currentProductClient.description
                            .split('\n')
                            .map((description, index) => {
                              return <p key={index}>{description}</p>;
                            })}
                        </span>
                      </div>
                    ) : (
                      <></>
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
                        <span>
                          {currentProductClient.material
                            .split('\n')
                            .map((material, index) => {
                              return <p key={index}>{material}</p>;
                            })}
                        </span>
                      </div>
                    ) : (
                      <></>
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
                      <div className="mb-4 an">
                        <span>
                          {currentProductClient.guide
                            .split('\n')
                            .map((guide, index) => {
                              return <p key={index}>{guide}</p>;
                            })}
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </section>
          {/* bình luận sản phẩm */}
          {/* <section className="my-10">
            <CommentProduct />
          </section> */}
          <section className="product-related">
            {productsRelatedClient.length > 1 && <ProductRelated />}
            {productsRelatedClient.length > 1 && (
              <div className="view-all my-10">
                <Link
                  to={`/product-category/${currentProductClient.productCategory.slug}`}
                  className="text"
                >
                  Xem tất cả
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
