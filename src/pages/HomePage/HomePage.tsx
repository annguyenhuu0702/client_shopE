import 'antd/dist/antd.css';
import { Row } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Product from '../../components/Product';
import Brand from './Brand';
import Category from './Category';
import SlideShow from './SlideShow';
import styles from './__homepage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';

import 'swiper/css';

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <div className={cx('home-page')}>
      <SlideShow />
      <Brand />
      <section className="new-product" style={{ marginTop: '48px' }}>
        <div className="w-1200">
          <h2 className="subject-line">HÀNG MỚI</h2>
          <Row className={cx('list-product')}>
            <div className={cx('new-arrival')}>
              <Link to="">
                <img
                  src="https://cdn.shopify.com/s/files/1/0456/5070/6581/files/New_Arrival_270x490_6991d991-adce-462d-a0eb-cf4159c20ddd_270x.jpg?v=1627833572"
                  alt=""
                />
              </Link>
            </div>
            <Product />
          </Row>
          <div className="view-all" style={{ margin: '48px 0' }}>
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      <section className="banner" style={{ marginTop: '48px' }}>
        <div className="w-1200">
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1657618849/supersports/1140x300_1_1512x_dignwt.jpg"
            alt=""
          />
        </div>
      </section>
      <section className={cx('categories')}>
        <div className="w-1200">
          <Category />
        </div>
      </section>
      <section className="sale-product" style={{ marginTop: '48px' }}>
        <div className="w-1200">
          <h2 className="subject-line">KHUYẾN MÃI</h2>
          <div className="slide-show">
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              navigation={true}
              loop={true}
            >
              <SwiperSlide>
                <Link to="" className="slide-show-custom">
                  <img
                    src="https://res.cloudinary.com/diot4imoq/image/upload/v1657680931/supersports/Promotion_Desktop_banner_1140x475_copy_g7tpkm.jpg"
                    alt=""
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="" className="slide-show-custom">
                  <img
                    src="https://res.cloudinary.com/diot4imoq/image/upload/v1657680969/supersports/1140x475_2c08432e-a520-46d7-a4bb-abe5399be701_bie7ar.jpg"
                    alt=""
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="" className="slide-show-custom">
                  <img
                    src="https://res.cloudinary.com/diot4imoq/image/upload/v1657680990/supersports/1140x475_6_1f615ef6-c846-4b12-ba08-7307cf4d9c77_fcxrkn.jpg"
                    alt=""
                  />
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
          <Row className={cx('list-product')} style={{ marginTop: '16px' }}>
            <Product />
          </Row>
          <div className="view-all" style={{ margin: '48px 0' }}>
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
