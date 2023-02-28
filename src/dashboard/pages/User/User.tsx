import React, { useEffect } from 'react';

import { Layout, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, authState } from '../../../redux/slice/authSlice';
import {
  userState,
  userActions,
  userSelector,
} from '../../../redux/slice/userSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableUser from './TableUser';
import { useTitle } from '../../../hooks/useTitle';

const { Content } = Layout;

const User: React.FC = () => {
  const dispatch = useDispatch();
  const { user }: authState = useSelector(authSelector);
  const { users, page, pageSize }: userState = useSelector(userSelector);

  useTitle('Tài khoản');

  useEffect(() => {
    dispatch(
      userActions.getAllUser({
        token: user.accessToken,
        dispatch,
        params: { p: page, limit: pageSize },
      })
    );
  }, [dispatch, page, pageSize, user.accessToken]);

  return (
    <main className="section-common">
      <HeaderTitle title="Tài khoản" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableUser />
          </div>
        </div>
      </Content>
      {users.count > 0 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={users.count}
            onChange={(page: number, pageSize: number) => {
              dispatch(userActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default User;
