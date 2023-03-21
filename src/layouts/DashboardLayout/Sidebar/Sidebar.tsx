import {
  AppstoreOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuProps } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './__sidebar.module.scss';
import { BiCategory, BiCollection } from 'react-icons/bi';

const cx = classNames.bind(styles);

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Thống kê', '/admin', <BarChartOutlined />),
  getItem('Khách hàng', '/admin/user', <UserOutlined />),
  getItem('Danh mục', '/admin/category', <BiCategory />),
  getItem('Bộ sưu tập', '/admin/collection', <BiCollection />),
  getItem('Quản lý sản phẩm', 'qlsanpham', <FontAwesomeIcon icon={faList} />, [
    getItem('Danh mục sản phẩm', '/admin/product-category'),
    getItem('Sản phẩm', '/admin/product'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ]),
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleContent = (item: any) => {
    navigate(item.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <section
      style={collapsed ? { width: '80px' } : { width: '256px' }}
      className={cx('wrap')}
    >
      <div className={cx('logo')}>
        {collapsed ? (
          <MenuUnfoldOutlined onClick={toggleCollapsed} />
        ) : (
          <MenuFoldOutlined onClick={toggleCollapsed} />
        )}
        {!collapsed && (
          <img
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1661177083/canifa/logo_xju1y6.svg"
            alt="logo"
            style={{
              height: '35px',
            }}
          />
        )}
      </div>
      <Menu
        className={cx('menu')}
        style={collapsed ? { width: '80px' } : { width: '256px' }}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleContent}
        selectedKeys={[location.pathname]}
      />
    </section>
  );
};

export default Sidebar;
