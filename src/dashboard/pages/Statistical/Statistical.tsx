import React from 'react';
import styles from './__statistical.module.scss';

import HeaderTitle from '../../components/HeaderTitle';
import classNames from 'classnames/bind';
import { Layout, Pagination } from 'antd';
import { useTitle } from '../../../hooks/useTitle';

const cx = classNames.bind(styles);
const { Content } = Layout;

const Statistical: React.FC = () => {
  useTitle('Statistical');
  return (
    <section className={cx('statistical')}>
      <HeaderTitle title="Statistical" />
      <Content className={cx('layout-content-cus')}>
        <div className={cx('content-wrap')}>
          <div className={cx('content')}></div>
        </div>
      </Content>
      <div className={cx('pagination-cus')}>
        <Pagination />
      </div>
    </section>
  );
};

export default Statistical;
