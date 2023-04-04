import React from 'react';
import styles from './__home.module.scss';

import HeaderTitle from '../../components/HeaderTitle';
import classNames from 'classnames/bind';
import { Layout, Pagination } from 'antd';
import { useTitle } from '../../../hooks/useTitle';

const cx = classNames.bind(styles);
const { Content } = Layout;

const Dashboard: React.FC = () => {
  useTitle('Dashboard');
  return (
    <main className={cx('statistical')}>
      <HeaderTitle title="Trang chủ" />
      <Content className={cx('layout-content-cus')}>
        <div className={cx('content-wrap')}>
          <div className={cx('content')}></div>
        </div>
      </Content>
      <div className={cx('pagination-cus')}>
        <Pagination />
      </div>
    </main>
  );
};

export default Dashboard;
