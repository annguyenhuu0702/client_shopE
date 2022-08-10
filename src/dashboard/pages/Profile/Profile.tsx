import React, { useMemo, useState } from 'react';
import styles from './__profile.module.scss';

import { Col, Row, Tabs } from 'antd';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { typeUser } from '../../../types/user';
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

  const currentUser: typeUser | null = useSelector(
    (state: any) => state.auth.currentUser.user
  );

  return (
    <section className={cx('profile')}>
      <HeaderTitle title="User" />
      <div className={cx('layout-content')}>
        <div className={cx('banner')}>
          <div className={cx('avatar')}>
            <img
              src={
                currentUser?.avatar === ''
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT65CXLkEWFDlHIHnU1hDnHHVn0GdfzBR7Ejg&usqp=CAU'
                  : `${currentUser?.avatar}`
              }
              alt=""
            />
          </div>
          <div className={cx('info')}>
            <h3 className={cx('name')}>
              {currentUser && currentUser.fullname}
            </h3>
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
                    <p>{currentUser && currentUser.email}</p>
                  </div>
                </div>
                <div className={cx('phone')}>
                  <FontAwesomeIcon icon={faPhone} />
                  <div className={cx('item')}>
                    <span>Phone</span>
                    <p>{currentUser && currentUser.phone}</p>
                  </div>
                </div>
                <div className={cx('birthday')}>
                  <FontAwesomeIcon icon={faCakeCandles} />
                  <div className={cx('item')}>
                    <span>Birthday</span>
                    <p className={cx('birthday')}>
                      {moment(currentUser && currentUser.birthday).format(
                        'YYYY/MM/DD'
                      )}
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
