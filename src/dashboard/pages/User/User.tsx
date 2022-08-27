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

const { Content } = Layout;

const User: React.FC = () => {
  const dispatch = useDispatch();
  const { user }: authState = useSelector(authSelector);
  const { users, page, pageSize }: userState = useSelector(userSelector);

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
    <section className="section-common">
      <HeaderTitle title="User" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableUser />
          </div>
        </div>
      </Content>
      <div className="common-pagination-cus">
        <Pagination
          pageSize={pageSize}
          current={page}
          total={users.count}
          onChange={(page: number, pageSize: number) => {
            dispatch(userActions.setPage({ page, pageSize }));
          }}
          showSizeChanger={true}
          pageSizeOptions={[7, 50, 100, 200]}
        />
      </div>
    </section>
  );
};

export default User;
