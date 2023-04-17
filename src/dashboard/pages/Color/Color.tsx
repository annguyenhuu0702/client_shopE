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
import TableColor from './TableColor/TableColor';

const { Content } = Layout;

const Color: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { colors, pageColor, pageSizeColor } =
    useSelector(variantValueSelector);

  useTitle('Màu sắc');

  useEffect(() => {
    dispatch(
      variantValueActions.getAllColor({
        token: user.accessToken,
        dispatch,
        params: { p: pageColor, limit: pageSizeColor },
      })
    );
  }, [dispatch, pageColor, pageSizeColor, user.accessToken]);

  return (
    <main className="section-common">
      <HeaderTitle title="Màu sắc" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableColor />
          </div>
        </div>
      </Content>
      {colors.count > 12 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSizeColor}
            current={pageColor}
            total={colors.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(
                variantValueActions.setPage({
                  page: pageColor,
                  pageSize: pageSize,
                })
              );
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Color;
