import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newsActions, newsSelector } from '../../redux/slice/newsSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import moment from 'moment';
import { useTitle } from '../../hooks/useTitle';
import { Breadcrumb, Col, Row } from 'antd';
import { News } from '../../types/news';
import { routes } from '../../config/routes';

const NewsDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  const { currentNewsClient, newsClient, isLoading } =
    useSelector(newsSelector);

  useEffect(() => {
    if (slug) {
      dispatch(newsActions.getNewsBySlugClient({ slug }));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    dispatch(newsActions.getAllNewsClient({}));
  }, [dispatch]);

  useTitle(currentNewsClient?.title);

  if (!currentNewsClient) return <></>;
  return (
    <main className="px-20 py-10 max-sm:px-4 max-sm:mt-24">
      {isLoading && <Loading />}
      <section>
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>
            <Link to={routes.home}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={routes.news}>Tin tức</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{currentNewsClient.title}</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <Row gutter={[24, 16]}>
        <Col xl={16}>
          <div>
            <h3 className="inline-block mb-0 text-6xl font-medium">
              {currentNewsClient.title}
            </h3>

            <div className="my-4 text-2xl text-gray-500">
              <span>
                {moment(currentNewsClient.createdAt).format(
                  'MM/DD/YYYY hh:mm:ss'
                )}
              </span>
            </div>
            <div className="my-10">
              <img
                src={currentNewsClient.thumbnail}
                alt=""
                className="block w-full h-full object-cover"
              />
            </div>
            <div
              className="px-20 text-2xl"
              dangerouslySetInnerHTML={{
                __html: `${currentNewsClient.content}`,
              }}
            ></div>
          </div>
        </Col>
        <Col xl={8}>
          {newsClient &&
            newsClient.rows
              .filter((item) => item.slug !== slug)
              .map((item: News) => {
                return (
                  <Col xl={24} key={item.id} className="mb-10">
                    <div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(`/news/${item.slug}`);
                        }}
                      >
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-full h-96"
                        />
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
        </Col>
      </Row>
    </main>
  );
};

export default NewsDetailPage;
