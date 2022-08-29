import React, { useEffect } from 'react';

import { Layout } from 'antd';
import HeaderTitle from '../../components/HeaderTitle';
import TableCategory from './TableCategory';
import { useTitle } from '../../../hooks/useTitle';
import { categoryTypeActions } from '../../../redux/slice/categoryTypeSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryActions,
  categorySelector,
  categoryState,
} from '../../../redux/slice/categorySlice';

const { Content } = Layout;

const Category: React.FC = () => {
  const dispatch = useDispatch();
  const { page }: categoryState = useSelector(categorySelector);

  useEffect(() => {
    dispatch(categoryTypeActions.getAllCategoryType({}));
  }, [dispatch]);

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
    <section className="section-common">
      <HeaderTitle title="Category" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableCategory />
          </div>
        </div>
      </Content>
    </section>
  );
};

export default Category;
