import React, { useEffect } from 'react';

import { Layout, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../redux/slice/userSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableUser from './TableUser';

const { Content } = Layout;

const User: React.FC = () => {
  const dispatch = useDispatch();
  const token: string | null = useSelector(
    (state: any) => state.auth.currentUser.accessToken
  );
  const page: number = useSelector((state: any) => state.user.page);
  const count: number = useSelector((state: any) => state.user.users?.count);

  useEffect(() => {
    dispatch(
      userActions.getAllUser({
        token,
        dispatch,
        params: { p: page, limit: 7 },
      })
    );
  }, [dispatch, page, token]);

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
            total={count}
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
