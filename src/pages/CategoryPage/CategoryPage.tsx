import React from 'react';
import { Breadcrumb, Col, Row } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import Product from '../../components/Product';

const CategoryPage: React.FC = () => {
  return (
    <main className="px-20 max-sm:px-4">
      <section className="my-8">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Nam</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <section className="mb-16">
        <div>
          <img
            className="common-img"
            src="https://media.canifa.com/Simiconnector/banner_name_tablet1675168324.webp"
            alt=""
          />
        </div>
      </section>
      <section className="mb-16 border-solid border-0 border-b-2 border-border-product-page">
        <div>
          <h3 className="m-0 mb-8 font-bold text-4xl">Danh mục sản phẩm</h3>
        </div>
        <div className="pb-6">
          <Swiper
            navigation={true}
            modules={[Pagination, Navigation]}
            slidesPerView={5}
            spaceBetween={35}
            breakpoints={{
              375: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <Link to="">
                <img
                  className="common-img-slide"
                  src="https://media.canifa.com/Simiconnector/simicategory_filename_tablet1672294265.webp"
                  alt=""
                />
                <div className="mt-8">
                  <span className="text-xl text-name-product">
                    Áo phông tay dài
                  </span>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="">
                <img
                  className="common-img-slide"
                  src="https://media.canifa.com/Simiconnector/simicategory_filename_tablet1672294283.webp"
                  alt=""
                />
                <div className="mt-8">
                  <span className="text-xl text-name-product">
                    Áo phông tay dài
                  </span>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="">
                <img
                  className="common-img-slide"
                  src="https://media.canifa.com/Simiconnector/simicategory_filename_tablet1629472230.webp"
                  alt=""
                />
                <div className="mt-8">
                  <span className="text-xl text-name-product">
                    Áo phông tay dài
                  </span>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="">
                <img
                  className="common-img-slide"
                  src="https://media.canifa.com/Simiconnector/simicategory_filename_tablet1672294397.webp"
                  alt=""
                />
                <div className="mt-8">
                  <span className="text-xl text-name-product">
                    Áo phông tay dài
                  </span>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="">
                <img
                  className="common-img-slide"
                  src="https://media.canifa.com/Simiconnector/simicategory_filename_tablet1672294418.webp"
                  alt=""
                />
                <div className="mt-8">
                  <span className="text-xl text-name-product">
                    Áo phông tay dài
                  </span>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="">
                <img
                  className="common-img-slide"
                  src="https://media.canifa.com/Simiconnector/simicategory_filename_tablet1672294511.webp"
                  alt=""
                />
                <div className="mt-8">
                  <span className="text-xl text-name-product">
                    Áo phông tay dài
                  </span>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="">
                <img
                  className="common-img-slide"
                  src="https://media.canifa.com/Simiconnector/simicategory_filename_tablet1672294433.webp"
                  alt=""
                />
                <div className="mt-8">
                  <span className="text-xl text-name-product">
                    Áo phông tay dài
                  </span>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="">
                <img
                  className="common-img-slide"
                  src="https://media.canifa.com/Simiconnector/simicategory_filename_tablet1664983519.webp"
                  alt=""
                />
                <div className="mt-8">
                  <span className="text-xl text-name-product">
                    Áo phông tay dài
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className="mb-16 ">
        <div>
          <h3 className="m-0 mb-8 font-bold text-4xl">Áo phông</h3>
        </div>
        <div className="pb-6">
          <Row gutter={[16, 16]}>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
          </Row>
          <div className="view-all mt-10">
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      <section className="mb-16 ">
        <div>
          <h3 className="m-0 mb-8 font-bold text-4xl">Áo phông</h3>
        </div>
        <div className="pb-6">
          <Row gutter={[16, 16]}>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
          </Row>
          <div className="view-all mt-10">
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      <section className="mb-16 ">
        <div>
          <h3 className="m-0 mb-8 font-bold text-4xl">Áo phông</h3>
        </div>
        <div className="pb-6">
          <Row gutter={[16, 16]}>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
          </Row>
          <div className="view-all mt-10">
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      <section className="mb-16 ">
        <div>
          <h3 className="m-0 mb-8 font-bold text-4xl">Áo phông</h3>
        </div>
        <div className="pb-6">
          <Row gutter={[16, 16]}>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
            <Col xl={6} md={6} xs={12}>
              <Product />
            </Col>
          </Row>
          <div className="view-all mt-10">
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
