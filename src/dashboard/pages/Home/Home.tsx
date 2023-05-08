import React, { useEffect, useState } from 'react';
import styles from './__home.module.scss';

import { Layout } from 'antd';
import classNames from 'classnames/bind';
import { useTitle } from '../../../hooks/useTitle';
import HeaderTitle from '../../components/HeaderTitle';
import { Link } from 'react-router-dom';
import { routes } from '../../../config/routes';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../redux/slice/authSlice';
import { productApi } from '../../../apis/productApi';

const cx = classNames.bind(styles);
const { Content } = Layout;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const [dataAdmin, setDataADmin] = useState<[]>([]);

  useEffect(() => {
    try {
      const getDataAdmin = async () => {
        const res = await productApi.getHomeAdmin(user.accessToken, dispatch);
        if (res.status === 200) {
          setDataADmin(res.data.data);
        }
      };
      getDataAdmin();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, user.accessToken]);

  useTitle('Dashboard');

  return (
    <main className={cx('statistical')}>
      <HeaderTitle title="Trang chủ" />
      <Content className={cx('layout-content-cus')}>
        <div className={cx('content-wrap')}>
          <div className={cx('content')}>
            <div className="bg-white dark:bg-gray-900">
              <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
                <h1 className="text-5xl mb-4 tracking-tight leading-none dark:text-white">
                  Xin chào <b>{user.user?.fullname}</b>
                </h1>
                <p className="text-3xl mb-8 font-normaltext-gray-500 dark:text-gray-400">
                  {moment().format('MM/DD/YYYY')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 flex-wrap gap-8 mt-8">
              {dataAdmin &&
                dataAdmin.map(
                  (item: { text: string; count: number; path: string }) => {
                    return (
                      <div
                        className="flex flex-col gap-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        key={item.path}
                      >
                        <span>
                          <h3 className="text-3xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                            {item.text}
                          </h3>
                        </span>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {item.count}
                        </p>
                        <div>
                          <Link
                            to={item.path}
                            className="inline-flex items-center px-3 py-2  font-medium text-center text-white bg-blue-700 rounded-lg"
                          >
                            Xem thêm
                          </Link>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </Content>
    </main>
  );
};

export default Dashboard;
