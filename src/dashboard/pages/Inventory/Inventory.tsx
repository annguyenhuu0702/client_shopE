import { Layout, Pagination } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import {
  productVariantActions,
  productVariantSelector,
} from '../../../redux/slice/productVariantSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableEnventory from './TableEnventory';

const { Content } = Layout;

const Inventory: React.FC = () => {
  const dispatch = useDispatch();
  const { page, pageSize, productVariants } = useSelector(
    productVariantSelector
  );

  useEffect(() => {
    dispatch(
      productVariantActions.getAllProductVariant({
        p: page,
        limit: pageSize,
      })
    );
  }, [dispatch, page, pageSize]);

  useTitle('Tồn kho');
  return (
    <main className="section-common">
      <HeaderTitle title="Tồn kho" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableEnventory />
          </div>
        </div>
      </Content>
      {productVariants.count > 0 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={productVariants.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(productVariantActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Inventory;
