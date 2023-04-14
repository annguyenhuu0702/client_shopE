import React, { useEffect, useMemo, useState } from 'react';
import styles from './__headerTop.module.scss';

import { SearchOutlined } from '@ant-design/icons';
import { Badge, Input } from 'antd';
import classNames from 'classnames/bind';
import { BiUserCircle } from 'react-icons/bi';
import { BsBag } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../../../apis/authApi';
import { routes } from '../../../../config/routes';
import { authActions, authSelector } from '../../../../redux/slice/authSlice';
import { cartActions, cartSelector } from '../../../../redux/slice/cartSlice';
import { favoriteProductActions } from '../../../../redux/slice/favoriteProductSlice';
import Navigation from '../HeaderNavigation';

const cx = classNames.bind(styles);

const HeaderTop: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector(cartSelector);
  const { user } = useSelector(authSelector);

  const [serachProduct, setSearchProduct] = useState<string>('');

  const handleLogout = () => {
    authApi.logout();
    dispatch(authActions.logoutSuccess());
    dispatch(cartActions.setCart());
  };

  const redirectCart = () => {
    navigate(routes.cart);
  };

  const handleSearchProduct = () => {
    const params = { keyword: serachProduct };
    let queryString = new URLSearchParams(params).toString();
    if (queryString !== '') {
      queryString = '?' + queryString;
    }
    if (serachProduct !== '') {
      navigate(`${routes.searchProduct}${queryString}`);
    }
  };

  const totalProduct = useMemo(() => {
    let totalProduct =
      cart &&
      cart.cartItems.reduce(
        (prev, currentValue) => prev + currentValue.quantity,
        0
      );
    return totalProduct || 0;
  }, [cart]);

  // lấy cart
  useEffect(() => {
    if (user.user) {
      dispatch(
        cartActions.getByUser({
          token: user.accessToken,
          dispatch,
        })
      );
    }
  }, [dispatch, user, user.accessToken]);

  // lấy sản phẩm yêu thích
  useEffect(() => {
    if (user.user) {
      dispatch(
        favoriteProductActions.getFavoriteProductByUser({
          token: user.accessToken,
          dispatch,
        })
      );
    }
  }, [dispatch, user, user.accessToken]);

  return (
    <section className={cx('header-top')}>
      <div className={cx('left')}>
        <Link to={routes.home} className={cx('logo')}>
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
            value={serachProduct}
            onChange={(e) => {
              setSearchProduct(e.target.value);
            }}
            size="large"
            placeholder="Bạn cần tìm gì..."
            suffix={
              <SearchOutlined
                className="cursor-pointer"
                onClick={() => {
                  handleSearchProduct();
                }}
              />
            }
            onPressEnter={handleSearchProduct}
            allowClear
          />
        </div>
        <div className={cx('group-icon')}>
          <div className={cx('account')}>
            <BiUserCircle />
            <div className={cx('wrap-account')}>
              <div className="arrow-up"></div>
              {user.user ? (
                <div className="block-hover">
                  <div className="block-child">
                    <Link
                      to={
                        user.user.role === 'admin'
                          ? '/admin/profile'
                          : '/account'
                      }
                      className="text"
                    >
                      Xin chào <b>{user.user.fullname}</b>
                    </Link>
                  </div>
                  <div className="block-child">
                    <Link
                      to={routes.home}
                      className="text"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="block-hover">
                  <div className="block-child">
                    <Link to={routes.login} className="text">
                      Đăng nhập
                    </Link>
                  </div>
                  <div className="block-child">
                    <Link to={routes.register} className="text">
                      Đăng ký
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={cx('cart')}
            onClick={() => {
              redirectCart();
            }}
          >
            <Badge count={totalProduct} className="w-full h-full">
              <BsBag
                className="w-10 h-8 text-white"
                onClick={() => {
                  navigate(routes.cart);
                }}
              />
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderTop;
