import { Breadcrumb, Col, Pagination, Popover, Row } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
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
import { ICollection } from '../../types/collection';
import { IProductCategory } from '../../types/productCategory';
import { removeTextBetweenParentheses } from '../../utils';
import ContentFilter from './ContentFilter';
import {
  productActions,
  productSelector,
} from '../../redux/slice/productSlice';

const ProductCategoryPage: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { currentCollectionClient } = useSelector(collectionSelector);
  const { currentProductCategoryClient } = useSelector(productCategorySelector);
  const dispatch = useDispatch();
  const { productsClient, pageClient, pageSizeClient } =
    useSelector(productSelector);

  useTitle(
    location.pathname === `/collection/${slug}`
      ? currentCollectionClient?.name
      : currentProductCategoryClient?.name
  );

  useEffect(() => {
    if (location.pathname === `/collection/${slug}`) {
      dispatch(
        collectionActions.getCollectionBySlugClient({
          slug: slug,
          productCategories: true,
        })
      );
    } else {
      dispatch(
        productCategoryActions.getProductCategoryBySlugClient({
          slug: slug,
          collection: true,
        })
      );
    }
  }, [dispatch, location.pathname, slug]);

  // lấy category để render
  const category = useMemo(() => {
    return currentCollectionClient
      ? currentCollectionClient.category
      : currentProductCategoryClient?.collection.category;
  }, [
    currentCollectionClient,
    currentProductCategoryClient?.collection.category,
  ]);

  // lấy sản phẩm theo slug
  useEffect(() => {
    dispatch(
      productActions.getAllProductClient({
        p: pageClient,
        limit: 12,
        otherSlug: slug,
      })
    );
  }, [slug, dispatch, pageClient]);

  return (
    <main className="px-20 max-sm:mt-24 max-sm:px-4">
      <section className="my-8 flex justify-between max-sm:hidden">
        {currentCollectionClient ? (
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={routes.home}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/${currentCollectionClient?.category.slug}`}>
                {currentCollectionClient?.category.name}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {removeTextBetweenParentheses(
                currentCollectionClient ? currentCollectionClient.name : ''
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
                  currentProductCategoryClient &&
                  currentProductCategoryClient.collection.category.slug
                }`}
              >
                {currentProductCategoryClient &&
                  currentProductCategoryClient.collection.category.name}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                to={`/${
                  currentProductCategoryClient &&
                  currentProductCategoryClient.collection.slug
                }`}
              >
                {currentProductCategoryClient &&
                  removeTextBetweenParentheses(
                    currentProductCategoryClient.collection.name
                  )}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {removeTextBetweenParentheses(
                currentProductCategoryClient
                  ? currentProductCategoryClient.name
                  : ''
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
                    .map((collection: ICollection) => {
                      return (
                        <li className="mb-10" key={collection.id}>
                          <Link
                            to={`/collection/${collection.slug}`}
                            className={`hover:text-red-600 transition ease-in-out delay-75 text-2xl font-bold ${
                              slug === collection.slug ||
                              collection.productCategories.find(
                                (item) => item.slug === slug
                              )
                                ? 'text-red-600'
                                : 'text-name-product'
                            }`}
                          >
                            {removeTextBetweenParentheses(collection.name)}
                          </Link>
                          <ul className="list-none m-0 mt-6">
                            {collection.productCategories.map(
                              (item: IProductCategory) => {
                                return (
                                  <li className="mb-6" key={item.id}>
                                    <Link
                                      to={`/product-category/${item.slug}`}
                                      className={`hover:text-red-600 transition ease-in-out delay-75 text-2xl  ${
                                        slug === item.slug
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
          {productsClient.rows.length > 0 ? (
            <Col xl={20} md={18} xs={24}>
              <Row gutter={[16, 16]}>
                {productsClient.rows.map((item) => {
                  return (
                    <Col xl={6} md={8} xs={12} key={item.id}>
                      <Product product={item} />
                    </Col>
                  );
                })}
              </Row>
              <section className="pb-12 mt-4 flex justify-end">
                <Pagination
                  pageSize={pageSizeClient}
                  current={pageClient}
                  total={productsClient.count}
                  onChange={(page: number, pageSize: number) => {
                    dispatch(productActions.setPageClient({ page, pageSize }));
                    window.scroll({
                      behavior: 'smooth',
                      top: 0,
                    });
                  }}
                />
              </section>
            </Col>
          ) : (
            <Col xl={20} md={18} xs={24}>
              <div className="flex items-center justify-center">
                <span className="text-3xl font-semibold">
                  Sản phẩm này tạm thời hết hàng!
                </span>
              </div>
            </Col>
          )}
        </Row>
      </section>
    </main>
  );
};

export default ProductCategoryPage;
