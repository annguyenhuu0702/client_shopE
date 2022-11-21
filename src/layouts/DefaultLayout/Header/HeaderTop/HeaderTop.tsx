import React from 'react';
import styles from './__headerTop.module.scss';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { RiStoreLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authApi } from '../../../../apis/authApi';
import {
  authActions,
  authSelector,
  authState,
} from '../../../../redux/slice/authSlice';
import Navigation from '../HeaderNavigation';

const cx = classNames.bind(styles);

const HeaderTop: React.FC = () => {
  const dispatch = useDispatch();

  const { user }: authState = useSelector(authSelector);

  const handleLogout = () => {
    authApi.logout();
    dispatch(authActions.logoutSuccess());
  };

  return (
    <section className={cx('header-top')}>
      <div className={cx('left')}>
        <Link to="/" className={cx('logo')}>
          <img
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1661177083/canifa/logo_xju1y6.svg"
            alt="Logo"
            height={35}
          />
        </Link>
        <Navigation />
      </div>
      <div className={cx('right')}>
        <div className="custom-input">
          <Input
            placeholder="Bạn cần tìm gì..."
            suffix={<SearchOutlined />}
            allowClear
          />
        </div>
        <div className={cx('group-icon')}>
          <div className={cx('store')}>
            <RiStoreLine />
          </div>
          <div className={cx('wish-list')}>
            <AiOutlineHeart />
          </div>
          <div className={cx('account')}>
            <BiUserCircle />
            <div className={cx('wrap-account')}>
              <div className="arrow-up"></div>
              {user.user ? (
                <div className="block-hover">
                  <div className="block-child">
                    <Link
                      to={user.user.roleId === 2 ? '/admin' : '/profile'}
                      className="text"
                    >
                      Xin chào <b>{user.user.fullname}</b>
                    </Link>
                  </div>
                  <div className="block-child">
                    <Link to="/" className="text" onClick={handleLogout}>
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="block-hover">
                  <div className="block-child">
                    <Link to="/login" className="text">
                      Đăng nhập
                    </Link>
                  </div>
                  <div className="block-child">
                    <Link to="/register" className="text">
                      Đăng ký
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={cx('cart')}>
            <HiOutlineShoppingBag />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderTop;
