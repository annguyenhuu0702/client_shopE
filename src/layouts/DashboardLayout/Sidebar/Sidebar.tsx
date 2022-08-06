import React, { useEffect, useState } from 'react';
import styles from './__sidebar.module.scss';

import classNames from 'classnames/bind';
import { Layout } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { typeUser } from '../../../types/user';
import { authApi } from '../../../apis/authApi';
import { authActions } from '../../../redux/slice/authSlice';
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
  const dispatch = useDispatch();
  const user: typeUser = useSelector(
    (state: any) => state.auth.currentUser.data.user
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [items, setItems] = useState<typeMenu[]>(() => {
    return getItems(location.pathname);
  });

  const handleLogout = () => {
    authApi.logout();
    dispatch(authActions.logoutSuccess());
  };

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
        <div
          className={cx('account')}
          onClick={() => {
            navigate('/admin/profile');
          }}
        >
          <div className={cx('avatar')}>
            <img
              src={
                user.avatar === ''
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT65CXLkEWFDlHIHnU1hDnHHVn0GdfzBR7Ejg&usqp=CAU'
                  : `${user.avatar}`
              }
              alt=""
            />
          </div>
          <div className={cx('info')}>
            {!collapsed && (
              <Link to="/admin/profile" className={cx('name')}>
                {user.fullname}
              </Link>
            )}
          </div>
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
                      navigate(`${item.path}`);
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
        <Link to="/" className={cx('logout')} onClick={handleLogout}>
          <FontAwesomeIcon icon={faPowerOff} />
          {!collapsed && <span>Log out</span>}
        </Link>
      </Sider>
    </Layout>
  );
};

export default Sidebar;
