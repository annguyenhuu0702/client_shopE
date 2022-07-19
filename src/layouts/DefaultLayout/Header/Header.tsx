import React from 'react';
import styles from './__header.module.scss';

import classNames from 'classnames/bind';
import HeaderTop from './HeaderTop';
import HeaderCenter from './HeaderCenter';
import HeaderNavigation from './HeaderNavigation';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('w-full')}>
        <div className="w-1200">
          <div className={cx('container')}>
            <HeaderTop />
            <HeaderCenter />
            <HeaderNavigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
