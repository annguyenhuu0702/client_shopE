import React, { useEffect } from 'react';

import { Layout, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import { authSelector } from '../../../redux/slice/authSlice';
import {
  paymentActions,
  paymentSelector,
} from '../../../redux/slice/paymentSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableOrder from './TableOrder/TableOrder';

const { Content } = Layout;

const Order: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { payments, page, pageSize } = useSelector(paymentSelector);

  useTitle('Đơn hàng');

  useEffect(() => {
    dispatch(
      paymentActions.getAllPayment({
        token: user.accessToken,
        dispatch,
        params: { p: page, limit: pageSize },
      })
    );
  }, [dispatch, page, pageSize, user.accessToken]);

  return (
    <main className="section-common">
      <HeaderTitle title="Đơn hàng" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableOrder />
          </div>
        </div>
      </Content>
      {payments.count > 12 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={payments.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(paymentActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Order;
