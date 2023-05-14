import React, { useEffect } from 'react';

import { Layout, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import { authSelector } from '../../../redux/slice/authSlice';
import {
  variantValueActions,
  variantValueSelector,
} from '../../../redux/slice/variantValueSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableSize from './TableSize/TableSize';

const { Content } = Layout;

const Size: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { sizes, page, pageSize } = useSelector(variantValueSelector);

  useTitle('Kích cỡ');

  useEffect(() => {
    dispatch(
      variantValueActions.getAllSize({
        token: user.accessToken,
        dispatch,
        params: { p: page, limit: pageSize },
      })
    );
  }, [dispatch, page, pageSize, user.accessToken]);

  return (
    <main className="section-common">
      <HeaderTitle title="Kích cỡ" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableSize />
          </div>
        </div>
      </Content>
      {sizes.count > 12 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={sizes.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(variantValueActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Size;
