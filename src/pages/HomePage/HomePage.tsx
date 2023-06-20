import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productApi } from '../../apis/productApi';
import Product from '../../components/Product';
import { useTitle } from '../../hooks/useTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { IProduct } from '../../types/product';
import { useDispatch, useSelector } from 'react-redux';
import { newsActions, newsSelector } from '../../redux/slice/newsSlice';
import moment from 'moment';
import { News } from '../../types/news';
import { authSelector } from '../../redux/slice/authSlice';
import ModalRecommen from './ModalRecommen/ModalRecommen';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(authSelector);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // sản phẩm khuyến mãi
  const [productSale, setProductSale] = useState<IProduct[]>([]);

  // sản phẩm bán chạy
  const [productSeller, setProductSeller] = useState<IProduct[]>([]);

  // gợi ý sản phẩm theo user

  const [productUser, setProductUser] = useState<IProduct[]>([]);

  const { newsClient } = useSelector(newsSelector);

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onOkModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    try {
      const getAllProductSale = async () => {
        const res = await productApi.getProductSale();
        const { data, status } = res;
        if (status === 200) {
          setProductSale(data.data.rows);
        }
      };
      getAllProductSale();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      const getAllProductSelling = async () => {
        const res = await productApi.getProductSelling();
        const { data, status } = res;
        if (status === 200) {
          setProductSeller(data.data.rows);
        }
      };
      getAllProductSelling();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (user.user !== null && user.user.suggestion.length === 0) {
        setIsOpenModal(true);
      }
    }
  }, [user]);

  useEffect(() => {
    try {
      const getAllProductUser = async () => {
        const res = await productApi.productRecommendationsbyUser(
          user.accessToken,
          dispatch
        );
        const { data, status } = res;
        if (status === 200) {
          setProductUser(data.data.rows);
        }
      };
      getAllProductUser();
    } catch (error) {
      console.log(error);
    }
  }, [user, user?.user?.suggestion]);

  // tin tức
  useEffect(() => {
    dispatch(newsActions.getAllNewsClient({}));
  }, [dispatch]);

  useTitle('CANIFA');
  return (
    <main className="home-page">
      {isOpenModal && (
        <ModalRecommen
          isModalOpen={isOpenModal}
          handleOk={() => {
            onOkModal();
          }}
          handleCancel={() => {
            onCloseModal();
          }}
        />
      )}
      <section className="max-sm:mt-24">
        <Swiper
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          autoplay={true}
          loop={true}
          slidesPerView={1}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to="/collection/ao">
              <img
                className="common-img"
                src="https://res.cloudinary.com/diot4imoq/image/upload/v1683340219/canifa/banner_name_tablet1682329031_tpg7gd.webp"
                alt=""
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/collection/ao">
              <img
                className="common-img"
                src="https://res.cloudinary.com/diot4imoq/image/upload/v1683340219/canifa/banner_name_tablet1683277783_u8tuut.webp"
                alt=""
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/collection/ao">
              <img
                className="common-img"
                src="https://res.cloudinary.com/diot4imoq/image/upload/v1683340219/canifa/banner_name_tablet1683293073_mzppzm.webp"
                alt=""
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      </section>

      {productUser && productUser.length > 0 && (
        <section className="product-sale">
          <div className="p-50">
            <h2 className="common-title">Có thể bạn quan tâm</h2>
            <Swiper
              navigation={true}
              modules={[Autoplay, Navigation]}
              slidesPerView={4}
              spaceBetween={10}
              className="mySwiper"
              breakpoints={{
                340: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {productUser?.map((item: IProduct, index: number) => {
                return (
                  <Col key={index}>
                    <SwiperSlide key={index}>
                      <Product product={item} />
                    </SwiperSlide>
                  </Col>
                );
              })}
            </Swiper>
          </div>
        </section>
      )}

      {productSeller && productSeller.length > 0 && (
        <section className="product-sale">
          <div className="p-50">
            <h2 className="common-title">Sản phẩm bán chạy</h2>
            <Swiper
              navigation={true}
              modules={[Autoplay, Navigation]}
              slidesPerView={4}
              spaceBetween={10}
              className="mySwiper"
              breakpoints={{
                340: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {productSeller?.map((item: IProduct, index: number) => {
                return (
                  <Col key={index}>
                    <SwiperSlide key={index}>
                      <Product product={item} />
                    </SwiperSlide>
                  </Col>
                );
              })}
            </Swiper>
          </div>
        </section>
      )}

      {productSale && productSale.length > 0 && (
        <section className="product-sale">
          <div className="p-50">
            <h2 className="common-title">Sản phẩm giá tốt</h2>
            <Swiper
              navigation={true}
              modules={[Autoplay, Navigation]}
              slidesPerView={4}
              spaceBetween={10}
              className="mySwiper"
              breakpoints={{
                340: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {/* {productSale?.map((item: IProduct, index: number) => {
                return (
                  <Col key={index}>
                    <SwiperSlide key={index}>
                      <Product product={item} />
                    </SwiperSlide>
                  </Col>
                );
              })} */}
              {productSale
                ?.slice()
                ?.sort((a: IProduct, b: IProduct) => {
                  const discountPercentA = (1 - a.priceSale / a.price) * 100;
                  const discountPercentB = (1 - b.priceSale / b.price) * 100;

                  // Sắp xếp theo giảm dần của phần trăm khuyến mãi
                  if (discountPercentB !== discountPercentA) {
                    return discountPercentB - discountPercentA;
                  }

                  // Nếu hai sản phẩm có cùng phần trăm khuyến mãi, ưu tiên sản phẩm có giá thấp hơn
                  if (a.priceSale !== b.priceSale) {
                    return a.priceSale - b.priceSale;
                  }

                  // Nếu cả phần trăm khuyến mãi và giá bằng nhau, sắp xếp theo thứ tự xuất hiện trong danh sách
                  return 0;
                })
                ?.map((item: IProduct, index: number) => {
                  return (
                    <Col key={index}>
                      <SwiperSlide key={index}>
                        <Product product={item} />
                      </SwiperSlide>
                    </Col>
                  );
                })}
            </Swiper>
          </div>
        </section>
      )}
      <section className="my-8">
        <div className="p-50">
          <h2 className="common-title">Tin tức</h2>
          <Row gutter={[16, 16]}>
            {newsClient &&
              newsClient.rows.slice(0, 3).map((item: News) => {
                return (
                  <Col xl={8} md={12} xs={24} key={item.id}>
                    <div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(`/news/${item.slug}`);
                        }}
                      >
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-full h-96"
                        />
                      </div>
                      <div>
                        <Link
                          to={`/news/${item.slug}`}
                          className="inline-block text-3xl font-medium mt-4"
                        >
                          {item.title}
                        </Link>
                      </div>
                      <div className="flex justify-between mt-4 text-gray-600">
                        <span className="inline-block text-2xl ">
                          {item.creator}
                        </span>
                        <span>
                          {moment(item.createdAt).format('MM/DD/YYYY hh:mm:ss')}
                        </span>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
          <div className="view-all my-10">
            <Link to={`/news`} className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
