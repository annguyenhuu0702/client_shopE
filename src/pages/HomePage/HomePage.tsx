import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../../apis/productApi';
import Product from '../../components/Product';
import { useTitle } from '../../hooks/useTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HomePage = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    try {
      const getAllData = async () => {
        const res = await productApi.getHomePage();
        const { data } = res.data;
        setData(data);
      };
      getAllData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useTitle('CANIFA');
  return (
    <main className="home-page">
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
      <section className="banner">
        <Link to={`/category/nu`}>
          <img
            className="common-img"
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1677223182/canifa/banner_name_tablet1675168225_r1kmqn.webp"
            alt=""
          />
        </Link>
      </section>
      <section className="bst-family">
        <div className="p-50">
          <h2 className="common-title">Áo phông</h2>
          <Row gutter={[12, 12]} className="list-product">
            {data?.tshirt.map((item: any) => {
              return (
                <Col xl={6} md={6} xs={12} key={item.id}>
                  <Product product={item} />
                </Col>
              );
            })}
          </Row>
          <div className="view-all my-10">
            <Link
              to={`/product-category/${data?.tshirt[0]?.productCategory?.slug}`}
              className="text"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      <section className="banner max-sm:mt-24">
        <Link to={`/category/nu`}>
          <img
            className="common-img"
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1677223203/canifa/banner_name_tablet1675168324_ze8v9u.webp"
            alt=""
          />
        </Link>
      </section>
      <section className="bst-family">
        <div className="p-50">
          <h2 className="common-title">Quần short</h2>
          <Row gutter={[12, 12]} className="list-product">
            {data?.short.map((item: any) => {
              return (
                <Col xl={6} md={6} xs={12} key={item.id}>
                  <Product product={item} />
                </Col>
              );
            })}
          </Row>
          <div className="view-all my-10">
            <Link
              to={`/product-category/${data?.short[0]?.productCategory?.slug}`}
              className="text"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
