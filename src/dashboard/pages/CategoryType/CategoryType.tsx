import React, { useEffect } from 'react';
import { Layout, Pagination } from 'antd';
import HeaderTitle from '../../components/HeaderTitle';
import TableCategoryType from './TableCategoryType/TableCategoryType';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryTypeActions,
  categoryTypeSelector,
  categoryTypeState,
} from '../../../redux/slice/categoryTypeSlice';
import { useTitle } from '../../../hooks/useTitle';

const { Content } = Layout;

const CategoryType: React.FC = () => {
  const dispatch = useDispatch();
  const { categoriesType, page, pageSize }: categoryTypeState =
    useSelector(categoryTypeSelector);

  useTitle('Category type');

  useEffect(() => {
    dispatch(
      categoryTypeActions.getAllCategoryType({
        p: page,
        limit: pageSize,
      })
    );
  }, [dispatch, page, pageSize]);

  return (
    <section className="section-common">
      <HeaderTitle title="Category type" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableCategoryType />
          </div>
        </div>
      </Content>
      <div className="common-pagination-cus">
        <Pagination
          pageSize={pageSize}
          current={page}
          total={categoriesType.count}
          onChange={(page: number, pageSize: number) => {
            dispatch(categoryTypeActions.setPage({ page, pageSize }));
          }}
          showSizeChanger={true}
          pageSizeOptions={[7, 50, 100, 200]}
        />
      </div>
    </section>
  );
};

export default CategoryType;
