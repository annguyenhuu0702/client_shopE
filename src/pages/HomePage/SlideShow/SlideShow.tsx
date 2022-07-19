import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import { Link } from 'react-router-dom';

const SlideShow: React.FC = () => {
  return (
    <div className="slide-show">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        // pagination={{ clickable: true }}
        navigation={true}
        loop={true}
      >
        <SwiperSlide>
          <Link to="" className="slide-show-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657263223/supersports/Banner_Hoka_desktop_banner_1950x_twd39h.jpg"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="" className="slide-show-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657263187/supersports/1545x500_8_60fe5dfe-74ce-4b24-837e-80f2ce4a0a80_foob37.jpg"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="" className="slide-show-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657263245/supersports/New_Balance_1080v12_6.6_-_8.6.2022_1545x500_c951caf0-eed5-43db-bb85-5d9e086fbd6b_1950x_u1jmxn.jpg"
              alt=""
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SlideShow;
