import { Layout, Modal, Pagination } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import {
  productVariantActions,
  productVariantSelector,
} from '../../../redux/slice/productVariantSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableInventory from './TableInventory';
import { productVariantApi } from '../../../apis/productVariant';
import { IProductVariant } from '../../../types/productVariant';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const Inventory: React.FC = () => {
  const [data, setData] = useState<IProductVariant[]>([]);
  const dispatch = useDispatch();
  const { page, pageSize, productVariants } = useSelector(
    productVariantSelector
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const hasLowInventory = () => {
    if (data && data.length > 0) {
      return data.some((product: any) => product.inventory < 40);
    }
  };

  console.log(hasLowInventory());

  useEffect(() => {
    dispatch(
      productVariantActions.getAllProductVariant({
        p: page,
        limit: pageSize,
      })
    );
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await productVariantApi.getAll();
        const { data, status } = res;
        if (status === 200) {
          setData(data.data.rows);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (hasLowInventory() === true) {
      setIsModalOpen(true);
    }
  }, [data]);

  useTitle('Tồn kho');
  return (
    <main className="section-common">
      <>
        <Modal
          title="Số lượng sản phẩm trong kho sắp hết!"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          // okText="Đồng ý"
          // cancelText="Quay lại"
          centered
          maskClosable={false}
          footer={[]}
        >
          <span className="text-2xl">
            Vui lòng bấm vào{' '}
            <Link
              to="/inventory/product-out-stock"
              className="text-red-600 font-bold"
            >
              đây
            </Link>{' '}
            để đi đến trang nhập thêm sản phẩm tồn kho
          </span>
        </Modal>
      </>
      <HeaderTitle title="Tồn kho" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableInventory />
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

export default Inventory;
