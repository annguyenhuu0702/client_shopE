import React, { useEffect, useMemo, useState } from 'react';
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
import {
  productActions,
  productSelector,
} from '../../redux/slice/productSlice';
import { ICollection } from '../../types/collection';
import { useTitle } from '../../hooks/useTitle';
import ProductCategoryPage from '../ProductCategoryPage';
import { routes } from '../../config/routes';
import { removeTextBetweenParentheses } from '../../utils';
import { productCategoryActions } from '../../redux/slice/productCategorySlice';
import { ICategory } from '../../types/category';

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { currentCategoryClient } = useSelector(categorySelector);
  const { productsByCategory } = useSelector(productSelector);

  // render danh mục sản phẩm
  // const renderProductCategory = currentCategoryClient?.collections
  //   .map((category: ICollection) => {
  //     return category?.productCategories[category.productCategories.length - 1];
  //   })
  //   .reverse()
  //   .splice(0, 4);

  // lấy banner
  useEffect(() => {
    dispatch(
      categoryActions.getCategoryBySlug({
        collections: true,
        slug: slug,
      })
    );
  }, [dispatch, slug]);

  useEffect(() => {
    if (slug) {
      dispatch(
        productActions.getAllProductByCategoryClient({
          slug,
          limitProduct: 4,
          limitCollection: 4,
        })
      );
    }
  }, [dispatch, slug]);

  console.log(productsByCategory);

  useTitle(currentCategoryClient?.name ? currentCategoryClient?.name : '');

  return (
    <main className="px-20 max-sm:px-4 max-sm:mt-24">
      <section className="my-8 max-sm:my-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={routes.home}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{currentCategoryClient?.name}</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <section className="mb-16">
        <div>
          <img
            className="common-img"
            src={currentCategoryClient?.thumbnail}
            alt=""
          />
        </div>
      </section>
      {/* {countProductCategory > 0 && (
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
                340: {
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
              {currentCategoryClient &&
                currentCategoryClient.collections.length > 0 &&
                currentCategoryClient.collections.map(
                  (collection: collection) => {
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
                  }
                )}
            </Swiper>
          </div>
        </section>
      )} */}
      {productsByCategory.rows.map((item, index) => {
        return (
          item.products.length > 0 && (
            <section className="mb-16" key={index}>
              <div>
                <h3 className="m-0 mb-8 font-bold text-4xl">
                  {item.productCategory?.name}
                </h3>
              </div>
              <div className="pb-6">
                <Row gutter={[16, 16]}>
                  {item.products.map((product) => {
                    return (
                      <Col xl={6} md={8} xs={12} key={product.id}>
                        <Product product={product} />
                      </Col>
                    );
                  })}
                </Row>
                {item.productCategory?.name != null && (
                  <div className="view-all mt-10">
                    <Link
                      to={`/product-category/${item.productCategory?.slug}`}
                      className="text"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                )}
              </div>
            </section>
          )
        );
      })}
    </main>
  );
};

export default CategoryPage;
