import { Col, Row } from 'antd';
import React from 'react';
import { useTitle } from '../../../hooks/useTitle';

const MyOrder: React.FC = () => {
  useTitle('Đơn hàng của tôi');
  return (
    <section className="pl-12 pb-36 max-sm:px-4 max-sm:pb-12 max-lg:px-8 max-lg:pb-12">
      <h3 className="mb-8 pt-8 text-4xl">Đơn hàng của tôi</h3>
      <Row className="lg:mb-20 ">
        <Col xl={24} md={24} xs={24}>
          <div className="w-full">
            <div className="w-full flex items-center text-left bg-name-product text-gray-200 text-2xl p-3 max-sm:hidden">
              <span className="w-2/5 uppercase">Đơn hàng</span>
              <span className="w-1/5 uppercase">Ngày mua</span>
              <span className="w-1/5 uppercase">Số lượng</span>
              <span className="w-1/5 uppercase">Tổng tiền</span>
            </div>
            <div className="w-full flex text-lef mt-8 pb-8 border-solid border-0 border-b-2 border-border-layout-cart">
              <div className="w-2/5 max-lg:mr-2 max-sm:w-3/4">
                <span className="text-2xl flex">helo</span>
              </div>
              <div className="w-1/5 max-sm:hidden">
                <span className="text-2xl flex">helo</span>
              </div>
              <div className="w-1/5 max-sm:w-1/4 max-sm:flex max-sm:items-start justify-end">
                <span className="text-2xl flex">helo</span>
              </div>
              <div className="w-1/5 max-sm:hidden">
                <span className="text-2xl flex">helo</span>
              </div>
            </div>
            <div className="w-full flex text-lef mt-8 pb-8 border-solid border-0 border-b-2 border-border-layout-cart">
              <div className="w-2/5 max-lg:mr-2 max-sm:w-3/4">
                <span className="text-2xl flex">helo</span>
              </div>
              <div className="w-1/5 max-sm:hidden">
                <span className="text-2xl flex">helo</span>
              </div>
              <div className="w-1/5 max-sm:w-1/4 max-sm:flex max-sm:items-start justify-end">
                <span className="text-2xl flex">helo</span>
              </div>
              <div className="w-1/5 max-sm:hidden">
                <span className="text-2xl flex">helo</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default MyOrder;
