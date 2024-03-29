import { Breadcrumb, Col, Pagination, Popover, Row } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineFilter } from 'react-icons/ai';
import { BsSortDown, BsSortUp } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
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
import {
  productActions,
  productSelector,
} from '../../redux/slice/productSlice';
import { ICollection } from '../../types/collection';
import { IProductCategory } from '../../types/productCategory';
import { removeTextBetweenParentheses } from '../../utils';
import ContentFilter from './ContentFilter';
import Loading from '../../components/Loading/Loading';

const ProductCategoryPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const p = searchParams.get('p');
  const sortBy = searchParams.get('sortBy');
  const sortType = searchParams.get('sortType');

  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const sizesId = searchParams.get('sizesId');
  const colorsId = searchParams.get('colorsId');

  // tắt mở popup filter
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { currentCollectionClient } = useSelector(collectionSelector);
  const { currentProductCategoryClient } = useSelector(productCategorySelector);
  const dispatch = useDispatch();
  const { productsClient, pageClient, pageSizeClient, isLoadingClient } =
    useSelector(productSelector);

  const handleSort = () => {
    const params = {
      sortBy: 'price',
      ...(!sortType || sortType === 'DESC' ? { sortType: 'ASC' } : {}),
      ...(min ? { min } : {}),
      ...(max ? { max } : {}),
      ...(sizesId ? { sizesId } : {}),
      ...(colorsId ? { colorsId } : {}),
      ...(p && +p > 1 ? { p: '' + p } : {}),
    };
    let queryString = new URLSearchParams(params).toString();
    if (queryString !== '') {
      queryString = `?` + queryString;
    }
    navigate(`${location.pathname}${queryString}`);
  };

  // filter
  const handleFilter = (obj: any) => {
    const params = {
      ...(p && +p > 1 ? { p: '' + p } : {}),
      ...(sortBy ? { sortBy: '' + sortBy } : {}),
      ...(!sortType || sortType === 'DESC' ? { sortType: 'ASC' } : {}),
      ...obj,
    };
    let queryString = new URLSearchParams(params).toString();
    if (queryString !== '') {
      queryString = `?` + queryString;
    }
    navigate(`${location.pathname}${queryString}`);
  };

  useTitle(
    location.pathname === `/collection/${slug}`
      ? currentCollectionClient?.name
      : currentProductCategoryClient?.name
  );

  useEffect(() => {
    // phân biệt gọi collection hay productcategory rồi trả về collection để render category
    if (location.pathname === `/collection/${slug}`) {
      dispatch(
        collectionActions.getCollectionBySlugClient({
          slug: slug,
          productCategories: true,
        })
      );
      dispatch(productCategoryActions.setProductCategoryClient(null));
    } else {
      dispatch(
        productCategoryActions.getProductCategoryBySlugClient({
          slug: slug,
          collection: true,
        })
      );
      dispatch(collectionActions.setCollectionClient(null));
    }
  }, [dispatch, location.pathname, slug]);

  // lấy category để render
  const renderCategory = useMemo(() => {
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
        p: p ? +p : pageClient,
        limit: pageSizeClient,
        otherSlug: slug,
        ...(sortBy ? { sortBy: '' + sortBy } : {}),
        ...(sortType ? { sortType: '' + sortType } : {}),
        ...(min ? { min } : {}),
        ...(max ? { max } : {}),
        ...(sizesId ? { sizesId } : {}),
        ...(colorsId ? { colorsId } : {}),
      })
    );
  }, [
    dispatch,
    slug,
    pageClient,
    pageSizeClient,
    searchParams,
    sortBy,
    sortType,
    p,
    min,
    max,
    sizesId,
    colorsId,
  ]);

  return (
    <main className="px-20 max-sm:mt-24 max-sm:px-4">
      {isLoadingClient && <Loading />}
      <section className="my-8 flex justify-between max-sm:hidden">
        {currentCollectionClient ? (
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={routes.home}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/category/${currentCollectionClient?.category.slug}`}>
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
                to={`/category/${
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
                to={`/collection/${
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
        {/* {productsClient.count > 0 && ( */}
        <div className="flex w-96 gap-4 max-lg:hidden">
          <Popover
            content={
              <ContentFilter
                onClosePopup={() => {
                  setIsOpen(false);
                }}
                min={min ? +min : -1}
                max={max ? +max : -1}
                colorsId={colorsId ? colorsId : ''}
                sizesId={sizesId ? sizesId : ''}
                handleFilter={handleFilter}
              />
            }
            trigger="click"
            placement="bottomLeft"
            open={isOpen}
            onOpenChange={(visible) => {
              setIsOpen(visible);
            }}
          >
            <div className="w-1/2 flex items-center justify-center cursor-pointer text-red-500 font-semibold text-2xl bg-bg-layout-profile px-6 py-4">
              <span>Bộ lọc</span>
              <span className="flex items-center pl-4">
                <AiOutlineFilter />
              </span>
            </div>
          </Popover>

          <div
            className="w-1/2 flex items-center justify-center cursor-pointer text-red-500 font-semibold text-2xl bg-bg-layout-profile px-6 py-4"
            onClick={() => {
              handleSort();
            }}
          >
            <span>Sắp xếp</span>
            <span className="flex items-center pl-4">
              {sortType === 'ASC' ? <BsSortUp /> : <BsSortDown />}
            </span>
          </div>
        </div>
        {/* )} */}
      </section>
      <section>
        <Row>
          <Col xl={4} md={6} xs={24}>
            <div>
              <ul className="list-none m-0">
                {renderCategory &&
                  [...renderCategory.collections]
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
                            {[...collection.productCategories]
                              .reverse()
                              .map((item: IProductCategory) => {
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
                              })}
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
              {productsClient.count > 12 && (
                <section className="pb-12 mt-4 flex justify-end">
                  <Pagination
                    pageSize={pageSizeClient}
                    current={p ? +p : 1}
                    total={productsClient.count}
                    onChange={(page: number) => {
                      let queryString = new URLSearchParams({
                        ...(sortBy ? { sortBy: '' + sortBy } : {}),
                        ...(sortType ? { sortType: '' + sortType } : {}),
                        ...(page > 1 ? { p: '' + page } : {}),
                        ...(min ? { min } : {}),
                        ...(max ? { max } : {}),
                        ...(sizesId ? { sizesId } : {}),
                        ...(colorsId ? { colorsId } : {}),
                      }).toString();
                      if (queryString !== '') {
                        queryString = `?` + queryString;
                      }
                      navigate(`${location.pathname}${queryString}`);
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                  />
                </section>
              )}
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
