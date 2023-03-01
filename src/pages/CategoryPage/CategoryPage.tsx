import React, { useEffect, useMemo } from 'react';
import { Breadcrumb, Col, Row } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link, useParams } from 'react-router-dom';
import Product from '../../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryActions,
  categorySelector,
} from '../../redux/slice/categorySlice';
import { collection } from '../../types/collection';
import { useTitle } from '../../hooks/useTitle';
import ProductCategoryPage from '../ProductCategoryPage';
import { routes } from '../../config/routes';
import { removeTextBetweenParentheses } from '../../utils';

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const { categorySlug } = useParams();
  const { categories, currentCategory } = useSelector(categorySelector);

  const checkCategoryPage = useMemo(() => {
    return categories.rows.find((category) => categorySlug === category.slug);
  }, [categories, categorySlug]);

  useEffect(() => {
    categorySlug &&
      dispatch(
        categoryActions.getCategoryBySlug({
          collections: true,
          slug: categorySlug,
        })
      );
  }, [dispatch, categorySlug]);
  useTitle(currentCategory?.name ? currentCategory?.name : '');

  const countProductCategory = useMemo(() => {
    return currentCategory
      ? currentCategory.collections.reduce((prev: any, current: any) => {
          return prev + current.productCategories.length;
        }, 0)
      : 0;
  }, [currentCategory]);

  if (!checkCategoryPage) return <ProductCategoryPage />;
  return (
    <main className="px-20 max-sm:px-4">
      <section className="my-8">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={routes.home}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{currentCategory?.name}</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <section className="mb-16">
        <div>
          <img className="common-img" src={currentCategory?.thumbnail} alt="" />
        </div>
      </section>
      {countProductCategory > 0 && (
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
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 40,
                },
              }}
              className="mySwiper"
            >
              {currentCategory &&
                currentCategory.collections.length > 0 &&
                currentCategory.collections.map((collection: collection) => {
                  return collection.productCategories.map((item) => {
                    return item.thumbnail ? (
                      <SwiperSlide>
                        <Link to={`/${item.slug}`}>
                          <img
                            className="common-img-slide"
                            src={item.thumbnail}
                            alt=""
                          />
                          <div className="mt-8">
                            <span className="text-xl text-name-product">
                              {removeTextBetweenParentheses(item.name)}
                            </span>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ) : (
                      <></>
                    );
                  });
                })}
            </Swiper>
          </div>
        </section>
      )}
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