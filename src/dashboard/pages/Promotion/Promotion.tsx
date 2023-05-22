import React, { useEffect } from 'react';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import { Content } from 'antd/es/layout/layout';
import { useTitle } from '../../../hooks/useTitle';
import TablePromotion from './TablePromotion/TablePromotion';
import { useDispatch, useSelector } from 'react-redux';
import {
  discountActions,
  discountSelector,
} from '../../../redux/slice/discountSlice';
import { authSelector } from '../../../redux/slice/authSlice';
import { Pagination } from 'antd';

const Promotion: React.FC = () => {
  const dispatch = useDispatch();
  const { discount, page, pageSize } = useSelector(discountSelector);
  const { user } = useSelector(authSelector);

  useEffect(() => {
    dispatch(
      discountActions.getAllDiscount({
        token: user.accessToken,
        dispatch,
        params: {
          p: page,
          limit: pageSize,
        },
      })
    );
  }, [dispatch, page, pageSize, user.accessToken]);

  useTitle('Khuyến mãi');

  return (
    <main className="section-common">
      <HeaderTitle title="Khuyến mãi" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TablePromotion />
          </div>
        </div>
      </Content>
      {discount.count > 9 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={discount.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(discountActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Promotion;
