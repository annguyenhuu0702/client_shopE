import { Pagination } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import {
  productActions,
  productSelector,
} from '../../../redux/slice/productSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableProduct from './TableProduct';

const ProductAdmin: React.FC = () => {
  const { page, pageSize, products } = useSelector(productSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      productActions.getAllProduct({
        p: page,
        limit: pageSize,
      })
    );
  }, [dispatch, page, pageSize]);
  useTitle('Sản phẩm');
  return (
    <main className="section-common">
      <HeaderTitle title="Sản phẩm" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableProduct />
          </div>
        </div>
      </Content>
      {products.count > 9 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={products.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(productActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default ProductAdmin;
