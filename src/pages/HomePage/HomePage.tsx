import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Product from '../../components/Product';
import styles from './__homepage.module.scss';

import 'swiper/css';
import { useTitle } from '../../hooks/useTitle';
import Endow from './Endow';

const cx = classNames.bind(styles);

const HomePage = () => {
  useTitle('CANIFA');
  return (
    <section className={cx('home-page')}>
      <section className="banner">
        <Link to="">
          <img
            className="common-img"
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1662004283/canifa/banner_name_tablet1661792546_s7efpf.jpg"
            alt="endow"
          />
        </Link>
      </section>
      <Endow />
      {/* code hàng mới đây là xong trang chủ */}
      <section className="block-endow">
        <div className="w-1200">
          <div className="title">
            <h2 className="common-title">Sản phẩm giá tốt</h2>
          </div>
          <Row>
            <Col xl={24} md={24}>
              <Link to="">
                <img
                  className="common-img"
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662007772/canifa/list_image_tablet1646719696_zpgxfv.jpg"
                  alt="product-endow"
                />
              </Link>
            </Col>
          </Row>
        </div>
      </section>
      <section className="bst-family" style={{ marginTop: '48px' }}>
        <div className="w-1200">
          <h2 className="common-title">BST gia đình</h2>
          <Row className={cx('list-product')} gutter={[24, 24]}>
            <Col xl={6}>
              <Link to="">
                <img
                  className="common-img"
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662008630/canifa/list_image_tablet_third1650513698_wdxvrh.png"
                  alt="style-at-home"
                />
              </Link>
            </Col>
            <Product />
          </Row>
          <div className="view-all" style={{ margin: '48px 0' }}>
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      <section className="block-canifaz">
        <div className="w-1200">
          <div className="title">
            <h2 className="common-title">Canifa Z</h2>
          </div>
          <Row>
            <Col xl={24} md={24}>
              <Link to="">
                <img
                  className="common-img"
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662017065/canifa/list_image_tablet1660929641_irwu7j.jpg"
                  alt="canifaz"
                />
              </Link>
            </Col>
          </Row>
        </div>
      </section>
      <section className="style-at-home" style={{ marginTop: '48px' }}>
        <div className="w-1200">
          <h2 className="common-title">Style at home</h2>
          <Row className={cx('list-product')} gutter={[24, 24]}>
            <Col xl={6}>
              <Link to="">
                <img
                  className="common-img"
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662008630/canifa/list_image_tablet_third1650513698_wdxvrh.png"
                  alt="style-at-home"
                />
              </Link>
            </Col>
            <Product />
          </Row>
          <div className="view-all" style={{ margin: '48px 0' }}>
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      <section className="jeans">
        <div className="w-1200">
          <div className="title">
            <h2 className="common-title">Quần jean</h2>
          </div>
          <Row>
            <Col xl={24} md={24}>
              <Link to="">
                <img
                  className="common-img"
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662018253/canifa/list_image_tablet1650248471_nn79wp.jpg"
                  alt="jeans"
                />
              </Link>
            </Col>
          </Row>
        </div>
      </section>
      <section className="bst-family" style={{ marginTop: '48px' }}>
        <div className="w-1200">
          <h2 className="common-title">Áo phông</h2>
          <Row className={cx('list-product')} gutter={[24, 24]}>
            <Col xl={6}>
              <Link to="">
                <img
                  className="common-img"
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662008630/canifa/list_image_tablet_third1650513698_wdxvrh.png"
                  alt="style-at-home"
                />
              </Link>
            </Col>
            <Product />
          </Row>
          <div className="view-all" style={{ margin: '48px 0' }}>
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomePage;
