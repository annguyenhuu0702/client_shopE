import {
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
import { AiOutlineBook } from 'react-icons/ai';
import { BiCategory, BiCollection, BiComment, BiCube } from 'react-icons/bi';
import { MdInventory } from 'react-icons/md';
import { TbNews } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './__sidebar.module.scss';
import { routes } from '../../../config/routes';

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
  getItem('Trang chủ', routes.admin, <BarChartOutlined />),
  getItem('Khách hàng', routes.userAdmin, <UserOutlined />),
  getItem('Danh mục', routes.categoryAdmin, <BiCategory />),
  getItem('Bộ sưu tập', routes.collectionAdmin, <BiCollection />),
  getItem(
    'Quản lý sản phẩm',
    'product_management',
    <FontAwesomeIcon icon={faList} />,
    [
      getItem('Danh mục sản phẩm', routes.productCategoryAdmin, <BiCube />),
      getItem('Sản phẩm', routes.productAdmin, <BiCube />),
      getItem('Kích thước', routes.sizeAdmin, <BiCube />),
      getItem('Màu sắc', routes.colorAdmin, <BiCube />),
      getItem('Khuyến mãi', routes.promotionAdmin, <BiCube />),
    ]
  ),

  getItem('Tồn kho', routes.inventoryAdmin, <MdInventory />),
  getItem('Đơn hàng', routes.orderAdmmin, <AiOutlineBook />),
  getItem('Bình luận', routes.commentAdmin, <BiComment />),
  getItem('Tin tức', routes.newsAdmin, <TbNews />),
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
