import React, { useEffect, useState } from 'react';
import styles from './__user.module.scss';

import { Layout, Pagination } from 'antd';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../redux/slice/userSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableUser from './TableUser';

const cx = classNames.bind(styles);
const { Content } = Layout;

const User: React.FC = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);
  const count = useSelector((state: any) => state.user.users?.data?.count);

  useEffect(() => {
    dispatch(userActions.getAllUser({}));
  }, [dispatch]);

  return (
    <section className={cx('user')}>
      <HeaderTitle title="User" />
      <Content className={cx('layout-content-cus')}>
        <div className={cx('content-wrap')}>
          <div className={cx('content')}>
            <TableUser />
          </div>
        </div>
      </Content>
      <div className={cx('pagination-cus')}>
        <Pagination
          pageSize={7}
          current={page}
          total={count}
          onChange={(p: number, pageSize: number) => {
            setPage(p);
            dispatch(userActions.getAllUser({ p, limit: pageSize }));
          }}
        />
      </div>
    </section>
  );
};

export default User;
