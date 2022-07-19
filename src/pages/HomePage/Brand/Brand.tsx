import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';

import 'swiper/css';
import { Link } from 'react-router-dom';

const Brand: React.FC = () => {
  return (
    <div className="w-1200 brand-show" style={{ marginTop: '26px' }}>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={4}
        slidesPerGroup={1}
        autoplay={{ delay: 5000 }}
        // pagination={{ clickable: true }}
        navigation={true}
        loop={true}
      >
        <SwiperSlide>
          <Link to="" className="brand-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657522319/supersports/Adidas_e5cfc57d-6b4d-4177-8308-e7fee3dc975a_180x_gh6lgu.png"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="" className="brand-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657522326/supersports/Airwalk_c3136505-c329-49dd-a5ef-b72fdbc5f619_180x_p5s4jl.png"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="" className="brand-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657522332/supersports/Asics_fd142007-ca17-4b80-9332-a487bc27479d_180x_qnotpn.png"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="" className="brand-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657522342/supersports/Bahe_e71e6de2-1638-4379-9a34-4ca2fc03f5b0_180x_jhizva.png"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="" className="brand-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657522364/supersports/Balega_12e82b61-fa1c-44ac-adf6-df47add0fbc3_180x_yawcrq.png"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="" className="brand-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657522371/supersports/Body_Sculpture_180x_v2up21.png"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="" className="brand-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657522382/supersports/Converse_180x_kgvu0m.png"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="" className="brand-custom">
            <img
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1657522418/supersports/Logo_Brand-20_180x_iik1gb.png"
              alt=""
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Brand;
