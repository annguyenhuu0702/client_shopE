import React, { useEffect } from 'react';

import { Layout, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import {
  categoryActions,
  categorySelector,
  categoryState,
} from '../../../redux/slice/categorySlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableCategory from './TableCategory';

const { Content } = Layout;

const Category: React.FC = () => {
  const dispatch = useDispatch();
  const { page, categories, pageSize }: categoryState =
    useSelector(categorySelector);

  useEffect(() => {
    dispatch(
      categoryActions.getAllCategory({
        p: page,
        limit: 7,
      })
    );
  }, [dispatch, page]);
  useTitle('Category');
  return (
    <main className="section-common">
      <HeaderTitle title="Category" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableCategory />
          </div>
        </div>
      </Content>
      <div className="common-pagination-cus">
        <Pagination
          pageSize={pageSize}
          current={page}
          total={categories.count}
          onChange={(page: number, pageSize: number) => {
            dispatch(categoryActions.setPage({ page, pageSize }));
          }}
          showSizeChanger={true}
          pageSizeOptions={[7, 50, 100, 200]}
        />
      </div>
    </main>
  );
};

export default Category;
