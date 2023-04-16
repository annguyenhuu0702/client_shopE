import { Layout, Pagination } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import {
  productCategoryActions,
  productCategorySelector,
} from '../../../redux/slice/productCategorySlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableProductCategory from './TableProductCategory';

const { Content } = Layout;

const ProductCategory: React.FC = () => {
  const dispatch = useDispatch();
  const { productCategories, page, pageSize } = useSelector(
    productCategorySelector
  );

  useEffect(() => {
    dispatch(
      productCategoryActions.getAllProductCategory({
        p: page,
        limit: pageSize,
      })
    );
  }, [dispatch, page, pageSize]);

  useTitle('Danh mục sản phẩm');
  return (
    <main className="section-common">
      <HeaderTitle title="Danh mục sản phẩm" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableProductCategory />
          </div>
        </div>
      </Content>
      {productCategories.count > 12 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={productCategories.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(productCategoryActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default ProductCategory;
