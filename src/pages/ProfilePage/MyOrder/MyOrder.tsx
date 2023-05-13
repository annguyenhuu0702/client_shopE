import { Col, Pagination, Row } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import { authSelector } from '../../../redux/slice/authSlice';
import {
  paymentActions,
  paymentSelector,
} from '../../../redux/slice/paymentSlice';
import { Payment } from '../../../types/payment';
import { castToVND } from '../../../utils';

const MyOrder: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { paymentClient, pageClient, pageSizeClient } =
    useSelector(paymentSelector);

  const handleDeleteOrder = (item: Payment) => {
    dispatch(
      paymentActions.deletePaymentClient({
        token: user.accessToken,
        dispatch,
        id: item.id,
        params: {
          p: pageClient,
          limit: pageSizeClient,
        },
      })
    );
  };

  useEffect(() => {
    if (user.accessToken) {
      dispatch(
        paymentActions.getAllPaymentByUser({
          token: user.accessToken,
          dispatch,
          params: {
            p: pageClient,
            limit: pageSizeClient,
          },
        })
      );
    }
  }, [user.accessToken, dispatch, pageClient, pageSizeClient]);

  useTitle('Đơn hàng của tôi');
  return (
    <section className="pl-12 pb-36 max-sm:px-4 max-sm:pb-12 max-lg:px-8 max-lg:pb-12">
      <h3 className="mb-8 pt-8 text-4xl">Đơn hàng của tôi</h3>
      <Row className="">
        <Col xl={24} md={24} xs={24}>
          <div className="w-full">
            <div className="w-full flex items-center text-left bg-name-product text-gray-200 text-2xl p-3 max-sm:hidden">
              <span className="w-1/6 uppercase">Đơn hàng</span>
              <span className="w-1/6 uppercase">Ngày mua</span>
              <span className="w-1/6 uppercase">Số lượng</span>
              <span className="w-1/6 uppercase">Trạng thái</span>
              <span className="w-1/6 uppercase">Tổng tiền</span>
              <span className="w-1/6 uppercase">Hành động</span>
            </div>
            {paymentClient.rows.map((item: Payment) => {
              return (
                <div
                  className="w-full flex text-lef mt-8 pb-8 border-solid border-0 border-b-2 border-border-layout-cart"
                  key={item.id}
                >
                  <div className="w-1/6 max-lg:mr-2 max-sm:w-3/4">
                    <span className="text-2xl flex">{item.id}</span>
                  </div>
                  <div className="w-1/6 max-sm:hidden">
                    <span className="text-2xl flex">
                      {moment(item.createdAt).format('MM/DD/YYYY')}
                    </span>
                  </div>
                  <div className="w-1/6 max-sm:w-1/4 max-sm:flex max-sm:items-start justify-end">
                    <span className="text-2xl flex">
                      {item.paymentItems.reduce(
                        (prev: any, currentValue: any) => {
                          return prev + currentValue.quantity;
                        },
                        0
                      )}
                    </span>
                  </div>
                  <div className="w-1/6 max-sm:hidden">
                    <span
                      className={`text-2xl flex font-semibold ${
                        item.status === 'Chờ xử lí' ? 'text-red-600' : ''
                      } ${
                        item.status === 'Đang giao hàng' ? 'text-blue-600' : ''
                      }  ${
                        item.status === 'Đã giao hàng' ? 'text-green-600' : ''
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="w-1/6 max-sm:hidden">
                    <span className="text-2xl flex font-bold">
                      {castToVND(item.totalPrice)}
                    </span>
                  </div>
                  <div className="w-1/6 max-sm:hidden">
                    {item.status === 'Chờ xử lí' && (
                      <span
                        className="text-2xl flex cursor-pointer text-red-500"
                        onClick={() => {
                          handleDeleteOrder(item);
                        }}
                      >
                        Hủy đơn hàng
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      {paymentClient.count > 5 && (
        <div className="absolute bottom-10 right-0">
          <Pagination
            pageSize={pageSizeClient}
            current={pageClient}
            total={paymentClient.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(paymentActions.setPageClient({ page, pageSize }));
            }}
          />
        </div>
      )}
    </section>
  );
};

export default MyOrder;
