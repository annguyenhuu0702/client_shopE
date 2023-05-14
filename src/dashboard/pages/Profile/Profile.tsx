import React from 'react';
import styles from './__profile.module.scss';

import {
  faCakeCandles,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Image, Row, Tabs, TabsProps } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import { authSelector, authState } from '../../../redux/slice/authSlice';
import HeaderTitle from '../../components/HeaderTitle';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ChangeProfile from './ChangeProfile';

const cx = classNames.bind(styles);

const Profile: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: `Thông tin`,
      children: <ChangeProfile />,
    },
    {
      key: 'password',
      label: `Mật khẩu`,
      children: <ChangePassword />,
    },
    {
      key: 'email',
      label: `Email`,
      children: <ChangeEmail />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  const { user }: authState = useSelector(authSelector);
  useTitle('Profile');

  return (
    <main className={cx('profile')}>
      <HeaderTitle title="Thông tin cá nhân" />
      <div className={cx('layout-content')}>
        <div className={cx('banner')}>
          <div className={cx('avatar')}>
            <Image
              src={
                user.user?.avatar === ''
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT65CXLkEWFDlHIHnU1hDnHHVn0GdfzBR7Ejg&usqp=CAU'
                  : `${user.user?.avatar}`
              }
            />
          </div>
          <div className={cx('info')}>
            <h3 className={cx('name')}>{user && user.user?.fullname}</h3>
          </div>
        </div>
        <div className={cx('content')}>
          <Row>
            <Col xl={14} md={14} className={cx('settings')}>
              <Tabs items={items} onChange={onChange} className="pl-4" />
            </Col>
            <Col xl={8} md={8} className={cx('contact')}>
              <div className={cx('content')}>
                <h3 className={cx('title')}>Kết nối</h3>
                <div className={cx('email')}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <div className={cx('item')}>
                    <span>Email</span>
                    <p>{user && user.user?.email}</p>
                  </div>
                </div>
                <div className={cx('phone')}>
                  <FontAwesomeIcon icon={faPhone} />
                  <div className={cx('item')}>
                    <span>SĐT</span>
                    <p>{user && user.user?.phone}</p>
                  </div>
                </div>
                <div className={cx('birthday')}>
                  <FontAwesomeIcon icon={faCakeCandles} />
                  <div className={cx('item')}>
                    <span>Sinh nhật</span>
                    <p className={cx('birthday')}>
                      {moment(user && user.user?.birthday).format('MM/DD/YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  );
};

export default Profile;
