import React, { useEffect } from 'react';

import { Layout, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import { authSelector } from '../../../redux/slice/authSlice';
import {
  couponActions,
  couponSelector,
} from '../../../redux/slice/couponSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableCoupon from './TableCoupon/TableCoupon';

const { Content } = Layout;

const Coupon: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { coupon, page, pageSize } = useSelector(couponSelector);

  useTitle('Khuyến mãi');

  useEffect(() => {
    dispatch(
      couponActions.getAllCoupon({
        token: user.accessToken,
        dispatch,
        params: { p: page, limit: pageSize },
      })
    );
  }, [dispatch, page, pageSize, user.accessToken]);

  return (
    <main className="section-common">
      <HeaderTitle title="Khuyến mãi" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableCoupon />
          </div>
        </div>
      </Content>
      {coupon.count > 9 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={coupon.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(couponActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Coupon;
