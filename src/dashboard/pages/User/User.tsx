import React, { useEffect } from 'react';
import styles from './__user.module.scss';

import { Layout } from 'antd';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../redux/slice/userSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableUser from './TableUser';

const cx = classNames.bind(styles);
const { Content } = Layout;

const User: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAllUser());
  }, [dispatch]);

  return (
    <section className={cx('user')}>
      <HeaderTitle title="User" />
      <Content>
        <div className={cx('content-wrap')}>
          <div className={cx('content')}>
            <TableUser />
          </div>
        </div>
      </Content>
    </section>
  );
};

export default User;
