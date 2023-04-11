import React from 'react';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import { Content } from 'antd/es/layout/layout';
import TableNews from './TableNews/TableNews';
import { useTitle } from '../../../hooks/useTitle';

const News: React.FC = () => {
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
      {/* {categories.count > 9 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={categories.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(categoryActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )} */}
    </main>
  );
};

export default News;
