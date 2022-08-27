import React, { useMemo, useState } from 'react';
import styles from './__profile.module.scss';

import { Col, Image, Row, Tabs } from 'antd';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import HeaderTitle from '../../components/HeaderTitle';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ChangeProfile from './ChangeProfile';
import {
  faCakeCandles,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { authSelector, authState } from '../../../redux/slice/authSlice';

const { TabPane } = Tabs;

const OperationsSlot: Record<PositionType, React.ReactNode> = {
  left: (
    <span
      style={{
        fontSize: '2.4rem',
        paddingLeft: '20px',
      }}
    >
      Settings
    </span>
  ),
};

type PositionType = 'left';

const cx = classNames.bind(styles);

const Profile: React.FC = () => {
  const [position] = useState<PositionType[]>(['left']);

  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {}
    );
  }, [position]);

  const { user }: authState = useSelector(authSelector);

  return (
    <section className={cx('profile')}>
      <HeaderTitle title="User" />
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
              <Tabs tabBarExtraContent={slot} centered>
                <TabPane tab="Change Profile" key="1">
                  <ChangeProfile />
                </TabPane>
                <TabPane tab="Change Password" key="2">
                  <ChangePassword />
                </TabPane>
                <TabPane tab="Change Email" key="3">
                  <ChangeEmail />
                </TabPane>
              </Tabs>
            </Col>
            <Col xl={8} md={8} className={cx('contact')}>
              <div className={cx('content')}>
                <h3 className={cx('title')}>Contact</h3>
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
                    <span>Phone</span>
                    <p>{user && user.user?.phone}</p>
                  </div>
                </div>
                <div className={cx('birthday')}>
                  <FontAwesomeIcon icon={faCakeCandles} />
                  <div className={cx('item')}>
                    <span>Birthday</span>
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
    </section>
  );
};

export default Profile;
