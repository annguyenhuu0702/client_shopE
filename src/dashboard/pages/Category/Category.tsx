import React from 'react';

import { Layout } from 'antd';
import HeaderTitle from '../../components/HeaderTitle';
import TableCategory from './TableCategory';
import { useTitle } from '../../../hooks/useTitle';

const { Content } = Layout;

const Category: React.FC = () => {
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
