import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, Col, Row, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  productActions,
  productSelector,
} from '../../redux/slice/productSlice';
import { useTitle } from '../../hooks/useTitle';
import { IVariantValue } from '../../types/variantValue';
import { IProductVariant } from '../../types/productVariant';

const ProductDetail: React.FC = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentProductClient, isLoadingClient } =
    useSelector(productSelector);
  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<IVariantValue>();
  const [selectedSize, setSelectedSize] = useState<IVariantValue>();
  const [isDes, setIsDes] = useState<boolean>(true);
  const [isMaterial, setIsMaterial] = useState<boolean>(false);
  const [isGuide, setIsGuide] = useState<boolean>(false);
  const [colors, setColors] = useState<IVariantValue[]>([]);
  const [sizes, setSizes] = useState<IVariantValue[]>([]);

  const handleSelectedColor = (color: IVariantValue) => {
    setSelectedColor(color);
  };

  const handleSelectedSize = (size: IVariantValue) => {
    setSelectedSize(size);
  };
  useEffect(() => {
    if (slug) {
      dispatch(
        productActions.getProductBySlugClient({
          slug,
        })
      );
    }
  }, [dispatch, slug]);

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
      setColors(colors);
      setSizes(sizes);
    }
  }, [currentProductClient]);
  useTitle(currentProductClient?.name);
  if (!currentProductClient) return <></>;
  if (isLoadingClient === true) return <Spin size="large" />;
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
              <Col xl={12} md={12} xs={24}>
                <Swiper
                  modules={[Pagination]}
                  className="my-swiper"
                  pagination={{ clickable: true }}
                >
                  {currentProductClient.productImages.map((item) => {
                    return (
                      <SwiperSlide key={item.id}>
                        <img
                          className="common-img"
                          src={item.path}
                          alt={currentProductClient.name}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Col>
              <Col xl={12} md={12} xs={24}>
                <div>
                  <div className="text-4xl text-name-product font-bold mb-4">
                    <span>{currentProductClient.name}</span>
                  </div>
                  <div className="text-2xl mb-4">
                    <span>
                      MÃ SP: <b>2LS22S018</b>
                    </span>
                  </div>
                  <div className="flex items-center text-3xl mb-4">
                    <span className="mr-16">
                      {castToVND(currentProductClient.price)}
                    </span>
                    {currentProductClient.priceSale > 0 && (
                      <span className="text-root-price line-through">
                        {castToVND(currentProductClient.priceSale)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3>Màu sắc:</h3>
                    <div className="flex flex-wrap">
                      {colors.map((color, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => {
                              handleSelectedColor(color);
                            }}
                            className={`w-20 h-20 border-solid border flex text-center items-center justify-center cursor-pointer mr-4 mb-4 ${
                              selectedColor?.id === color.id ? 'font-bold' : ''
                            }`}
                          >
                            {color.name}
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
                              handleSelectedSize(size);
                            }}
                            className={`w-20 h-20 border-solid border flex text-center items-center justify-center cursor-pointer mr-4 mb-4 ${
                              selectedSize?.id === size.id ? 'font-bold' : ''
                            }`}
                          >
                            {size.name}
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
