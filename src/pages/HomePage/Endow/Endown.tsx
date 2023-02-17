import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Endow: React.FC = () => {
  return (
    <section className="p-50">
      <div className="title">
        <h2 className="common-title">Ưu đãi riêng bạn</h2>
      </div>
      <Row gutter={[8, 8]}>
        <Col xl={12} md={12}>
          <Link to="">
            <img
              className="common-img"
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1662004977/canifa/list_image_tablet1660064322_pdoeco.jpg"
              alt="endow"
            />
          </Link>
        </Col>
        <Col xl={12} md={12}>
          <Link to="">
            <img
              className="common-img"
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1662005003/canifa/list_image_tablet_second1661965786_yxfs0o.jpg"
              alt="endow"
            />
          </Link>
        </Col>
      </Row>
    </section>
  );
};

export default Endow;
