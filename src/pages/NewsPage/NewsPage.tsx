import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newsActions, newsSelector } from '../../redux/slice/newsSlice';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { News } from '../../types/news';
import { useTitle } from '../../hooks/useTitle';
import moment from 'moment';
import Loading from '../../components/Loading/Loading';

const NewsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { newsClient, isLoading } = useSelector(newsSelector);

  useEffect(() => {
    dispatch(newsActions.getAllNewsClient({}));
  }, [dispatch]);

  useTitle('Tin tức');
  return (
    <main className="px-20 py-20 max-sm:px-4 max-sm:mt-24">
      {isLoading && <Loading />}
      <Row gutter={[16, 16]}>
        {newsClient &&
          newsClient.rows.map((item: News) => {
            return (
              <Col xl={8} md={12} xs={24} key={item.id}>
                <div>
                  <div>
                    <img src={item.thumbnail} alt="" className="w-full h-96" />
                  </div>
                  <div>
                    <Link
                      to={`/${item.slug}`}
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
