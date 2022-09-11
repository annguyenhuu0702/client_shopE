import React from 'react';
import styles from './__header.module.scss';

import classNames from 'classnames/bind';
import HeaderTop from './HeaderTop';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('w-full')}>
        <div className="p-50">
          <div className={cx('container')}>
            <HeaderTop />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
