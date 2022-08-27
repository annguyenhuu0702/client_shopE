import React, { useEffect } from 'react';

import { Layout, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, typeAuthState } from '../../../redux/slice/authSlice';
import {
  typeUserState,
  userActions,
  userSelector,
} from '../../../redux/slice/userSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableUser from './TableUser';

const { Content } = Layout;

const User: React.FC = () => {
  const dispatch = useDispatch();
  const { user }: typeAuthState = useSelector(authSelector);
  const { users, page }: typeUserState = useSelector(userSelector);

  useEffect(() => {
    dispatch(
      userActions.getAllUser({
        token: user.accessToken,
        dispatch,
        params: { p: page, limit: 7 },
      })
    );
  }, [dispatch, page, user.accessToken]);

  return (
    <section className="section-common">
      <HeaderTitle title="User" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableUser />
          </div>
        </div>
      </Content>
      {page >= 1 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={7}
            current={page}
            total={users.count}
            onChange={(page: number) => {
              dispatch(userActions.setPage(page));
            }}
          />
        </div>
      )}
    </section>
  );
};

export default User;
