import React, { useEffect } from 'react';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import { Content } from 'antd/es/layout/layout';
import TableNews from './TableNews/TableNews';
import { useTitle } from '../../../hooks/useTitle';
import { newsActions, newsSelector } from '../../../redux/slice/newsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../redux/slice/authSlice';
import { Pagination } from 'antd';

const News: React.FC = () => {
  const dispatch = useDispatch();
  const { news, page, pageSize } = useSelector(newsSelector);
  const { user } = useSelector(authSelector);
  useEffect(() => {
    dispatch(
      newsActions.getAllNews({
        token: user.accessToken,
        dispatch,
        params: {
          p: page,
          limit: pageSize,
        },
      })
    );
  }, [dispatch, page, pageSize, user.accessToken]);

  useTitle('Tin tức');

  return (
    <main className="section-common">
      <HeaderTitle title="Danh mục" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableNews />
          </div>
        </div>
      </Content>
      {news.count > 12 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={news.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(newsActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default News;
