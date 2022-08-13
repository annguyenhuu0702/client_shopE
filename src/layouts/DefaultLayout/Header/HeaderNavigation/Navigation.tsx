import React from 'react';
import styles from './__navigation.module.scss';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const HeaderNavigation: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <section className={cx('navigation')}>
      <div className={cx('menu')}>
        <ul className={cx('list-item')}>
          <li className={cx('item')}>
            <Link to="/" className={cx('group-category')}>
              Trang chủ
            </Link>
          </li>
          <li className={cx('item')}>
            <Link to="" className={cx('group-category')}>
              Sản phẩm mới
            </Link>
          </li>
          <li className={cx('item')}>
            <Link to="" className={cx('group-category')}>
              aaa
            </Link>
            <FontAwesomeIcon icon={faAngleDown} className={cx('icon')} />
            <div className={cx('block-category')}>
              <div style={{ display: 'flex', width: '60%' }}>
                <div className={cx('wrap-children')}>
                  <Link to="" className={cx('category')}>
                    aaa
                  </Link>
                  <ul className={cx('child-category')}>
                    <li>
                      <Link to="">aa</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={cx('banner')}>
                <img
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1657609158/supersports/490x185-M_720x_gcrmgv.jpg"
                  alt=""
                />
                <img
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1657609313/supersports/Banner_Hoka_menu_banner_720x_iidfc1.jpg"
                  alt=""
                />
              </div>
            </div>
          </li>
        </ul>
        <div className={cx('endow')}>
          <Link to="/uu-dai">Ưu đãi</Link>
        </div>
      </div>
    </section>
  );
};

export default HeaderNavigation;
