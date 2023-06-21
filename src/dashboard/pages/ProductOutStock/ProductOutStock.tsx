import { Layout, Pagination } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import {
  productVariantActions,
  productVariantSelector,
} from '../../../redux/slice/productVariantSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableProductOutStock from './TableProductOutStock/TableProductOutStock';

const { Content } = Layout;

const ProductOutStock: React.FC = () => {
  const dispatch = useDispatch();
  const { page, pageSize, productVariants } = useSelector(
    productVariantSelector
  );

  useEffect(() => {
    dispatch(
      productVariantActions.getAllProductVariantOutStock({
        p: page,
        limit: pageSize,
      })
    );
  }, [dispatch, page, pageSize]);

  useTitle('Tồn kho');
  return (
    <main className="section-common">
      <HeaderTitle title="Tồn kho (Các sản phẩm có số lượng dưới 40)" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableProductOutStock />
          </div>
        </div>
      </Content>
      {productVariants.count > 12 && (
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

export default ProductOutStock;
