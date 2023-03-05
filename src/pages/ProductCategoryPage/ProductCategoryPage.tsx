import { Breadcrumb, Col, Pagination, Popover, Row } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BsSortDown } from 'react-icons/bs';
import { AiOutlineFilter } from 'react-icons/ai';
import Product from '../../components/Product';
import { routes } from '../../config/routes';
import { useTitle } from '../../hooks/useTitle';
import {
  collectionActions,
  collectionSelector,
} from '../../redux/slice/collectionSlice';
import {
  productCategoryActions,
  productCategorySelector,
} from '../../redux/slice/productCategorySlice';
import { collection } from '../../types/collection';
import { productCategory } from '../../types/productCategory';
import { removeTextBetweenParentheses } from '../../utils';
import ContentFilter from './ContentFilter';

const ProductCategoryPage: React.FC = () => {
  const { categorySlug } = useParams();
  const { currentCollection } = useSelector(collectionSelector);
  const { currentProductCategory } = useSelector(productCategorySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      collectionActions.getCollectionBySlug({
        slug: categorySlug,
        productCategories: true,
      })
    );
  }, [dispatch, categorySlug]);

  useEffect(() => {
    dispatch(
      productCategoryActions.getProductCategoryBySlug({
        slug: categorySlug,
        collection: true,
      })
    );
  }, [dispatch, categorySlug]);

  const category = useMemo(() => {
    return currentCollection
      ? currentCollection.category
      : currentProductCategory?.collection.category;
  }, [currentCollection, currentProductCategory?.collection.category]);

  useTitle(
    currentCollection
      ? currentCollection?.name
      : currentProductCategory
      ? currentProductCategory?.name
      : ''
  );

  return (
    <main className="px-20 max-sm:mt-24 max-sm:px-4">
      <section className="my-8 flex justify-between max-sm:hidden">
        {currentCollection ? (
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={routes.home}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/${currentCollection?.category.slug}`}>
                {currentCollection?.category.name}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {removeTextBetweenParentheses(
                currentCollection ? currentCollection.name : ''
              )}
            </Breadcrumb.Item>
          </Breadcrumb>
        ) : (
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={routes.home}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                to={`/${
                  currentProductCategory &&
                  currentProductCategory.collection.category.slug
                }`}
              >
                {currentProductCategory &&
                  currentProductCategory.collection.category.name}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                to={`/${
                  currentProductCategory &&
                  currentProductCategory.collection.slug
                }`}
              >
                {currentProductCategory &&
                  removeTextBetweenParentheses(
                    currentProductCategory.collection.name
                  )}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {removeTextBetweenParentheses(
                currentProductCategory ? currentProductCategory.name : ''
              )}
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        <div className="flex w-96 gap-4 max-lg:hidden">
          <Popover
            content={<ContentFilter />}
            trigger="click"
            placement="bottomLeft"
          >
            <div className="w-1/2 flex items-center justify-center cursor-pointer text-red-500 font-semibold text-2xl bg-bg-layout-profile px-6 py-4">
              <span>Bộ lọc</span>
              <span className="flex items-center pl-4">
                <AiOutlineFilter />
              </span>
            </div>
          </Popover>

          <div className="w-1/2 flex items-center justify-center cursor-pointer text-red-500 font-semibold text-2xl bg-bg-layout-profile px-6 py-4">
            <span>Sắp xếp</span>
            <span className="flex items-center pl-4">
              <BsSortDown />
            </span>
          </div>
        </div>
      </section>
      <section>
        <Row>
          <Col xl={4} md={6} xs={24}>
            <div>
              <ul className="list-none m-0">
                {category &&
                  [...category.collections]
                    .reverse()
                    .map((collection: collection) => {
                      return (
                        <li className="mb-10" key={collection.id}>
                          <Link
                            to={`/${collection.slug}`}
                            className={`hover:text-red-600 transition ease-in-out delay-75 text-2xl font-bold ${
                              categorySlug === collection.slug ||
                              collection.productCategories.find(
                                (item) => item.slug === categorySlug
                              )
                                ? 'text-red-600'
                                : 'text-name-product'
                            }`}
                          >
                            {removeTextBetweenParentheses(collection.name)}
                          </Link>
                          <ul className="list-none m-0 mt-6">
                            {collection.productCategories.map(
                              (item: productCategory) => {
                                return (
                                  <li className="mb-6" key={item.id}>
                                    <Link
                                      to={`/${item.slug}`}
                                      className={`hover:text-red-600 transition ease-in-out delay-75 text-2xl  ${
                                        categorySlug === item.slug
                                          ? 'text-red-600'
                                          : 'text-name-product'
                                      }`}
                                    >
                                      {removeTextBetweenParentheses(item.name)}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </li>
                      );
                    })}
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
        <Pagination defaultCurrent={1} total={50} />
      </section>
    </main>
  );
};

export default ProductCategoryPage;
