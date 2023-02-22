import React from 'react';
import { Breadcrumb, Col, Row, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import Product from '../../components/Product';
const ProductCategoryPage: React.FC = () => {
  return (
    <main className="px-20 max-sm:px-4">
      <section className="my-8">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href=" ">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href=" ">Nam</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Sản phẩm mới</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <section>
        <Row>
          <Col xl={4} md={6} xs={24}>
            <div>
              <ul className="list-none m-0">
                <li className="mb-10">
                  <Link
                    to=""
                    className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product font-bold"
                  >
                    Sản phẩm mới
                  </Link>
                </li>
                <li className="mb-10">
                  <Link
                    to=""
                    className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product font-bold "
                  >
                    Áo quần
                  </Link>
                  <ul className="list-none m-0 mt-6">
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Áo ngắn tay
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Áo ngắn tay
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Áo ngắn tay
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Áo ngắn tay
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Áo ngắn tay
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Áo ngắn tay
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Áo ngắn tay
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Áo ngắn tay
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Áo ngắn tay
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="mb-10">
                  <Link
                    to=""
                    className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product font-bold"
                  >
                    Phụ kiện
                  </Link>
                  <ul className="list-none m-0 mt-6">
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Phụ kiện
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        to=""
                        className="hover:text-red-600 transition ease-in-out delay-75 text-2xl text-name-product"
                      >
                        Đồ dùng cá nhân
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="mb-10">
                  <Link
                    to=""
                    className="hover:text-red-600 transition ease-in-out delay-75  text-2xl text-name-product font-bold"
                  >
                    Giá tốt
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xl={20} md={18} xs={24}>
            <Row gutter={[16, 16]}>
              <Col xl={6} md={8} xs={12}>
                <Product />
              </Col>
              <Col xl={6} md={8} xs={12}>
                <Product />
              </Col>
              <Col xl={6} md={8} xs={12}>
                <Product />
              </Col>
              <Col xl={6} md={8} xs={12}>
                <Product />
              </Col>
              <Col xl={6} md={8} xs={12}>
                <Product />
              </Col>
              <Col xl={6} md={8} xs={12}>
                <Product />
              </Col>
              <Col xl={6} md={8} xs={12}>
                <Product />
              </Col>
              <Col xl={6} md={8} xs={12}>
                <Product />
              </Col>
              <Col xl={6} md={8} xs={12}>
                <Product />
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <section className="pb-12 mt-4 flex justify-end">
        <Pagination defaultCurrent={1} total={50} />;
      </section>
    </main>
  );
};

export default ProductCategoryPage;
