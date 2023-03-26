import React, { useEffect } from 'react';

import { Layout, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import { authSelector } from '../../../redux/slice/authSlice';
import { userActions, userSelector } from '../../../redux/slice/userSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableUser from './TableUser';

const { Content } = Layout;

const User: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { users, page, pageSize } = useSelector(userSelector);

  useTitle('Khách hàng');

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
      <HeaderTitle title="Khách hàng" />
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
            showSizeChanger={false}
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
