import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  productActions,
  productSelector,
} from '../../redux/slice/productSlice';
import { Col, Pagination, Row } from 'antd';
import Product from '../../components/Product/Product';
import Loading from '../../components/Loading/Loading';
import { IProduct } from '../../types/product';
import { productApi } from '../../apis/productApi';

const SearchProductPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || undefined;

  const [data, setData] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const { productsClient, pageClient, pageSizeClient, isLoadingClient } =
  //   useSelector(productSelector);

  // const p = searchParams.get('p');

  // useEffect(() => {
  //   dispatch(
  //     productActions.getAllProductClient({
  //       name,
  //       p: p ? +p : pageClient,
  //       limit: pageSizeClient,
  //     })
  //   );
  // }, [dispatch, name, p, pageClient, pageSizeClient, searchParams]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (keyword) {
          setIsLoading(true);
          const res = await productApi.searchProduct({ keyword });
          const { data, status } = res;
          if (status === 200) {
            setIsLoading(false);
            setData(data.data.rows);
          }
        }
      };
      fetchData();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [keyword]);

  return (
    <main className="px-20 py-10 max-sm:px-4 max-sm:mt-24">
      {isLoading && <Loading />}
      <section className="mb-4">
        <span className="text-4xl">
          <b>Kết quả tìm kiếm: {keyword}</b>
        </span>
      </section>
      {data.length > 0 ? (
        <>
          <section>
            <Row gutter={[16, 16]}>
              {data.map((item) => {
                return (
                  <Col xl={6} md={8} xs={12} key={item.id}>
                    <Product product={item} />
                  </Col>
                );
              })}
            </Row>
          </section>
          {/* {productsClient.count > 12 && (
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
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              />
            </section>
          )} */}
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
