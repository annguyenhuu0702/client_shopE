import { Avatar, Popover } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authApi } from '../../../apis/authApi';
import { routes } from '../../../config/routes';
import {
  authActions,
  authSelector,
  authState,
} from '../../../redux/slice/authSlice';
import styles from './__headerTitle.module.scss';

const cx = classNames.bind(styles);

interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({ title }: Props) => {
  const dispatch = useDispatch();

  const { user }: authState = useSelector(authSelector);

  const handleLogout = () => {
    authApi.logout();
    dispatch(authActions.logoutSuccess());
  };
  return (
    <section className={cx('header')}>
      <span className={cx('title')}>{title}</span>
      <div className={cx('account')}>
        <Popover
          placement="bottomRight"
          trigger="click"
          content={
            <div className="flex flex-col px-4 text-2xl ">
              <h3 className="mb-0 pb-4 font-semibold  border-solid border-0 border-b-2 border-gray-200">
                {user && user.user?.fullname}
              </h3>
              <div className="pb-2 pt-4 flex items-center">
                <BiEdit className="text-blue-500 cursor-pointer" />
                <Link to="/admin/profile" className=" text-blue-500 pl-2">
                  Cập nhật tài khoản
                </Link>
              </div>
              <div className="flex items-center">
                <IoExitOutline className="text-blue-500 cursor-pointer" />
                <Link
                  to={routes.home}
                  className="text-blue-500 pl-2"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Link>
              </div>
            </div>
          }
        >
          <Avatar className="bg-cyan-400 cursor-pointer">
            <span className="text-white-500">
              {user && user.user?.fullname.slice(0, 1)}
            </span>
          </Avatar>
        </Popover>
      </div>
    </section>
  );
};

export default HeaderTitle;
