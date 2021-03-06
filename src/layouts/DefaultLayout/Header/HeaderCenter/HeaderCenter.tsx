import React from 'react';
import 'antd/dist/antd.css';

import classNames from 'classnames/bind';
import styles from './__headerCenter.module.scss';

import { Input } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const HeaderCenter: React.FC = () => {
  const onSearch = (value: string) => console.log(value);
  return (
    <div className={cx('header-center')}>
      <div className={cx('left')}>
        <Link to="/" className={cx('logo')}>
          <img
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1656990500/supersports/logo_360x_xpnpoo.png"
            alt="Logo"
            width={215}
            height={35}
          />
        </Link>
      </div>
      <div className={cx('right')}>
        <div className={`${cx('input-search')} ${'custom-input'}`}>
          <Input.Search
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={onSearch}
          ></Input.Search>
        </div>
        <div className="btn-common">
          <ShoppingCartOutlined className="icon" />
          <Link to="/cart" className="text">
            Giỏ hàng (0)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderCenter;
