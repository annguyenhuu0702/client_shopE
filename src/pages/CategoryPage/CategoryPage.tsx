import { Breadcrumb, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Loading from '../../components/Loading/Loading';
import Product from '../../components/Product';
import { routes } from '../../config/routes';
import { useTitle } from '../../hooks/useTitle';
import {
  categoryActions,
  categorySelector,
} from '../../redux/slice/categorySlice';
import {
  productActions,
  productSelector,
} from '../../redux/slice/productSlice';
import { removeTextBetweenParentheses } from '../../utils';

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { currentCategoryClient } = useSelector(categorySelector);
  const { productsByCategory, isLoadingClient } = useSelector(productSelector);

  // lấy banner
  useEffect(() => {
    dispatch(
      categoryActions.getCategoryBySlug({
        collections: true,
        slug: slug,
      })
    );
  }, [dispatch, slug]);

  // lấy sản phẩm
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

  useTitle(currentCategoryClient?.name ? currentCategoryClient?.name : '');

  return (
    <main className="px-20 max-sm:px-4 max-sm:mt-24">
      {isLoadingClient && <Loading />}
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
      {productsByCategory.rows.map((item, index) => {
        return (
          item.products.length > 0 && (
            <section className="mb-16" key={index}>
              <div>
                <h3 className="m-0 mb-8 font-bold text-4xl">
                  {removeTextBetweenParentheses(item.productCategory?.name)}
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
