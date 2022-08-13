import React, { useEffect } from 'react';
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
  const token: string | null = useSelector(
    (state: any) => state.auth.currentUser.accessToken
  );
  const page: number = useSelector((state: any) => state.user.page);
  const count: number = useSelector((state: any) => state.user.users?.count);

  useEffect(() => {
    dispatch(
      userActions.getAllUser({
        token,
        dispatch,
        params: { p: page, limit: 7 },
      })
    );
  }, [dispatch, page, token]);

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
      {page >= 1 && (
        <div className={cx('pagination-cus')}>
          <Pagination
            pageSize={7}
            current={page}
            total={count}
            onChange={(page: number) => {
              dispatch(userActions.setPage(page));
            }}
          />
        </div>
      )}
    </section>
  );
};

export default User;
