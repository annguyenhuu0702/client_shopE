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
  getItem('Statistical', '/admin', <BarChartOutlined />),
  getItem('User', '/admin/user', <UserOutlined />),
  getItem('All Category', 'sub-category', <FontAwesomeIcon icon={faList} />, [
    getItem('Category Type', '/admin/category-type'),
    getItem('Category', '/admin/category'),
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
            alt=""
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
