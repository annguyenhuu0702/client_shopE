import React from 'react';
import styles from './__headerTitle.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../../../apis/authApi';
import {
  authActions,
  authSelector,
  authState,
} from '../../../redux/slice/authSlice';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({ title }: Props) => {
  const dispatch = useDispatch();

  const { user }: authState = useSelector(authSelector);

  const handleLogout = () => {
    authApi.logout();
    dispatch(authActions.logoutSuccess());
  };
  return (
    <section className={cx('header')}>
      <span className={cx('title')}>{title}</span>
      <div className={cx('account')}>
        <span>
          Hi, <b>{user && user.user?.fullname}</b>
        </span>
        {user && (
          <div className={cx('profile')}>
            <Link to="/admin/profile">My Account</Link>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeaderTitle;
