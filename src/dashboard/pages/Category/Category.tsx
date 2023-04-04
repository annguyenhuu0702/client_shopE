import { Layout, Pagination } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import {
  categoryActions,
  categorySelector,
} from '../../../redux/slice/categorySlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableCategory from './TableCategory';

const { Content } = Layout;

const Category: React.FC = () => {
  const dispatch = useDispatch();
  const { page, pageSize, categories } = useSelector(categorySelector);

  useEffect(() => {
    dispatch(
      categoryActions.getAllCategory({
        p: page,
        limit: pageSize,
      })
    );
  }, [dispatch, page, pageSize]);

  useTitle('Danh mục');
  return (
    <main className="section-common">
      <HeaderTitle title="Danh mục" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableCategory />
          </div>
        </div>
      </Content>
      {categories.count > 9 && (
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
      )}
    </main>
  );
};

export default Category;
