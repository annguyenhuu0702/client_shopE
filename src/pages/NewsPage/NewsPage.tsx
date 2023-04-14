import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newsActions, newsSelector } from '../../redux/slice/newsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, Col, Row } from 'antd';
import { News } from '../../types/news';
import { useTitle } from '../../hooks/useTitle';
import moment from 'moment';
import Loading from '../../components/Loading/Loading';
import { routes } from '../../config/routes';

const NewsPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newsClient, isLoading } = useSelector(newsSelector);

  useEffect(() => {
    dispatch(newsActions.getAllNewsClient({}));
  }, [dispatch]);

  useTitle('Tin tức');
  return (
    <main className="px-20 py-10 max-sm:px-4 max-sm:mt-24">
      {isLoading && <Loading />}
      <section>
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>
            <Link to={routes.home}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tin tức</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <Row gutter={[16, 16]}>
        {newsClient &&
          newsClient.rows.map((item: News) => {
            return (
              <Col xl={8} md={12} xs={24} key={item.id}>
                <div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/news/${item.slug}`);
                    }}
                  >
                    <img src={item.thumbnail} alt="" className="w-full h-96" />
                  </div>
                  <div>
                    <Link
                      to={`/news/${item.slug}`}
                      className="inline-block text-3xl font-medium mt-4"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="flex justify-between mt-4 text-gray-600">
                    <span className="inline-block text-2xl ">
                      {item.creator}
                    </span>
                    <span>
                      {moment(item.createdAt).format('MM/DD/YYYY hh:mm:ss')}
                    </span>
                  </div>
                </div>
              </Col>
            );
          })}
      </Row>
    </main>
  );
};

export default NewsPage;
