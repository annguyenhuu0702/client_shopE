import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import 'swiper/css';
import Product from '../../components/Product';
import { useTitle } from '../../hooks/useTitle';
import Endow from './Endow';

const HomePage = () => {
  useTitle('CANIFA');
  return (
    <main className="home-page">
      <section className="banner max-sm:mt-24">
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
        <div className="p-50">
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
      <section className="bst-family">
        <div className="p-50">
          <h2 className="common-title">BST gia đình</h2>
          <Row gutter={[12, 12]} className="list-product">
            <Col xl={6} md={6} xs={12}>
              <Link to="">
                <img
                  className="common-img"
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662008630/canifa/list_image_tablet_third1650513698_wdxvrh.png"
                  alt="style-at-home"
                />
              </Link>
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
          <div className="view-all my-10">
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      <section className="block-canifaz">
        <div className="p-50">
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
      <section className="style-at-home">
        <div className="p-50">
          <h2 className="common-title">Style at home</h2>
          <Row className="list-product" gutter={[12, 12]}>
            <Col xl={6} md={6} xs={12}>
              <Link to="">
                <img
                  className="common-img"
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662008630/canifa/list_image_tablet_third1650513698_wdxvrh.png"
                  alt="style-at-home"
                />
              </Link>
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
          <div className="view-all" style={{ margin: '24px 0' }}>
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
      <section className="jeans">
        <div className="p-50">
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
      <section>
        <div className="p-50">
          <h2 className="common-title">Áo phông</h2>
          <Row className="list-product" gutter={[12, 12]}>
            <Col xl={6} md={6} xs={12}>
              <Link to="">
                <img
                  className="common-img"
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662008630/canifa/list_image_tablet_third1650513698_wdxvrh.png"
                  alt="style-at-home"
                />
              </Link>
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
          <div className="view-all" style={{ margin: '24px 0' }}>
            <Link to="" className="text">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
