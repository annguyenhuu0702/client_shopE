import React from 'react';
import styles from './__headerTitle.module.scss';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { typeUser } from '../../../types/user';
import { authApi } from '../../../apis/authApi';
import { authActions } from '../../../redux/slice/authSlice';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({ title }: Props) => {
  const dispatch = useDispatch();
  const currentUser: typeUser | null = useSelector(
    (state: any) => state.auth.currentUser.user
  );

  const handleLogout = () => {
    authApi.logout();
    dispatch(authActions.logoutSuccess());
  };
  return (
    <section className={cx('header')}>
      <span>{title}</span>
      <div className={cx('account')}>
        <h3>
          Hi, <b>{currentUser && currentUser.fullname}</b>
        </h3>
        <div className={cx('profile')}>
          <Link to="/admin/profile">My Account</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeaderTitle;
