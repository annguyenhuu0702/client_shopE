import React, { useEffect, useState } from 'react';
import styles from './__sidebar.module.scss';
// import 'antd/dist/antd.css';

import classNames from 'classnames/bind';
import { Layout } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const { Sider } = Layout;

const cx = classNames.bind(styles);

interface typeMenu {
  icon: any;
  name: string;
  path: string;
  isActive: boolean;
}

const getItems = (pathname: string): typeMenu[] => {
  return [
    {
      icon: <BarChartOutlined className={cx('icon')} />,
      name: 'Statistical',
      path: '/admin',
      isActive: '/admin' === pathname,
    },
    {
      icon: <UserOutlined className={cx('icon')} />,
      name: 'User',
      path: '/admin/user',
      isActive: '/admin/user' === pathname,
    },
  ];
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navagate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [items, setItems] = useState<typeMenu[]>(() => {
    return getItems(location.pathname);
  });

  useEffect(() => {
    setItems(getItems(location.pathname));
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }} className={cx('wrap')}>
      <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={cx('logo')}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <img
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1656990500/supersports/logo_360x_xpnpoo.png"
            alt=""
            style={
              collapsed
                ? { display: 'none' }
                : { width: '140px', height: '35px' }
            }
          />
        </div>
        <div className={cx('menu')}>
          <ul>
            {items &&
              items.map((item: typeMenu, index: number) => {
                return (
                  <li
                    key={index}
                    className={cx('item', {
                      active: item.isActive,
                    })}
                    onClick={() => {
                      navagate(`${item.path}`);
                    }}
                  >
                    {item.icon}
                    <Link
                      to={item.path}
                      style={collapsed ? { display: 'none' } : {}}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </Sider>
    </Layout>
  );
};

export default Sidebar;
