import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Product from '../../../components/Product';
import { routes } from '../../../config/routes';
import { useTitle } from '../../../hooks/useTitle';

const FavoriteProduct: React.FC = () => {
  useTitle('Sản phẩm yêu thích');
  return (
    <section className="pl-12 pb-36 max-sm:px-4 max-sm:pb-12 max-lg:px-8 max-lg:pb-12">
      <h3 className="mb-8 pt-8 text-4xl">Sản phẩm yêu thích</h3>
      {/* <p className="text-3xl">
        Bạn chưa có sản phẩm yêu thích! Vui lòng ấn &nbsp;
        <b>
          <Link to={routes.home}>vào đây</Link>
        </b>
        &nbsp; để xem thêm sản phẩm
      </p> */}
      <Row gutter={[16, 16]}>
        <Col xl={8} md={12} xs={12}>
          <Product />
        </Col>
        <Col xl={8} md={12} xs={12}>
          <Product />
        </Col>
        <Col xl={8} md={12} xs={12}>
          <Product />
        </Col>
        <Col xl={8} md={12} xs={12}>
          <Product />
        </Col>
      </Row>
    </section>
  );
};

export default FavoriteProduct;
