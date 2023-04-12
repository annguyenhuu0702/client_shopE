import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  productActions,
  productSelector,
} from '../../redux/slice/productSlice';
import { Col, Pagination, Row } from 'antd';
import Product from '../../components/Product/Product';
import Loading from '../../components/Loading/Loading';

const SearchProductPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('keyword') || undefined;
  const { productsClient, pageClient, pageSizeClient, isLoadingClient } =
    useSelector(productSelector);

  const p = searchParams.get('p');

  useEffect(() => {
    dispatch(
      productActions.getAllProductClient({
        name,
        p: p ? +p : pageClient,
        limit: pageSizeClient,
      })
    );
  }, [dispatch, name, p, pageClient, pageSizeClient, searchParams]);

  return (
    <main className="px-20 py-10 max-sm:px-4 max-sm:mt-24">
      {isLoadingClient && <Loading />}
      <section className="mb-4">
        <span className="text-4xl">
          <b>Kết quả tìm kiếm: {name}</b>
        </span>
      </section>
      {productsClient.rows.length > 0 ? (
        <>
          <section>
            <Row gutter={[16, 16]}>
              {productsClient.rows.map((item) => {
                return (
                  <Col xl={6} md={8} xs={12} key={item.id}>
                    <Product product={item} />
                  </Col>
                );
              })}
            </Row>
          </section>
          {productsClient.count > 12 && (
            <section className="pb-12 mt-4 flex justify-end">
              <Pagination
                pageSize={pageSizeClient}
                current={p ? +p : 1}
                total={productsClient.count}
                onChange={(page: number) => {
                  const params = { keyword: name };
                  let queryString = new URLSearchParams({
                    ...(params ? params : {}),
                    ...(page > 1 ? { p: '' + page } : {}),
                  }).toString();
                  if (queryString !== '') {
                    queryString = `?` + queryString;
                  }
                  navigate(`${location.pathname}${queryString}`);
                }}
              />
            </section>
          )}
        </>
      ) : (
        <div className="text-center my-8">
          <span className="text-3xl font-semibold">
            Không tìm thấy sản phẩm
          </span>
        </div>
      )}
    </main>
  );
};

export default SearchProductPage;
