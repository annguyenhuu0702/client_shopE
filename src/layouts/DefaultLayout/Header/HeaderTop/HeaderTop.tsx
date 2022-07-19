import React from 'react';
import styles from './__headerTop.module.scss';

import { DownOutlined } from '@ant-design/icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { typeUser } from '../../../../types/user';
import { authActions } from '../../../../redux/slice/authSlice';

const cx = classNames.bind(styles);

const HeaderTop: React.FC = () => {
  const dispatch = useDispatch();
  const user: typeUser = useSelector(
    (state: any) => state.auth?.currentUser?.user
  );

  const handleLogout = () => {
    dispatch(authActions.logOut());
  };

  return (
    <div className={cx('header-top')}>
      <div className={cx('left')}>
        <div className={cx('language')}>
          <img
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1656990506/supersports/vi_h1w8dm.png"
            alt=""
            width={24}
            height={24}
          />
          <span className={cx('text-language')}>
            Tiếng Việt
            <DownOutlined className={cx('icon')} />
          </span>
          <div className={cx('wrap-language')}>
            <div className={cx('arrow-up')}></div>
            <div className="block-hover">
              <div className="block-child">
                <img
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1656990506/supersports/vi_h1w8dm.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="text-block">Tiếng Việt</span>
              </div>
              <div className="block-child">
                <img
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1656990518/supersports/en_tslcz4.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="text-block">English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('right')}>
        <div className={cx('account')}>
          <span className={cx('text')}>
            Tài khoản
            <DownOutlined className={cx('icon')} />
          </span>
          <div className={cx('wrap-account')}>
            <div className={`${'arrow-up'} ${cx('arrow-custom')}`}></div>
            {user ? (
              <div className="block-hover">
                <div className="block-child">
                  <Link to="" className="text">
                    Xin chào <b>{user.full_name}</b>
                  </Link>
                </div>
                <div className="block-child">
                  <Link to="" className="text">
                    Địa chỉ của bạn
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
                  <Link to="" className="text">
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
        <div className={cx('stores')}>
          <span className={cx('text')}>
            Hệ thống cửa hàng
            <FontAwesomeIcon icon={faLocationDot} className={cx('icon')} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
