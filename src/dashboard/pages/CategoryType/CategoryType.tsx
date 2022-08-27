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

const { Content } = Layout;

const CategoryType: React.FC = () => {
  const dispatch = useDispatch();
  const { categoriesType, page }: categoryTypeState =
    useSelector(categoryTypeSelector);

  useEffect(() => {
    dispatch(
      categoryTypeActions.getAllCategoryType({
        p: page,
        limit: 7,
      })
    );
  }, [dispatch, page]);

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
      {page >= 1 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={7}
            current={page}
            total={categoriesType.count}
            onChange={(page: number) => {
              dispatch(categoryTypeActions.setPage(page));
            }}
          />
        </div>
      )}
    </section>
  );
};

export default CategoryType;
