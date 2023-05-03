import React, { useState } from 'react';

import { Col, Form, Input, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import {
  paymentActions,
  paymentSelector,
} from '../../../../redux/slice/paymentSlice';

const ModalOrder: React.FC = () => {
  const dispatch = useDispatch();

  const { currentPayment } = useSelector(paymentSelector);

  const { user } = useSelector(authSelector);

  const { isModal, title } = useSelector(modalSelector);

  const initialValues = {
    fullName: currentPayment ? currentPayment.fullname : '',
    phone: currentPayment ? currentPayment.phone : '',
    city: currentPayment ? currentPayment.city : '',
    district: currentPayment ? currentPayment.district : '',
    ward: currentPayment ? currentPayment.ward : '',
    status: currentPayment ? currentPayment.status : '',
    shippingCost: currentPayment ? currentPayment.shippingCost : '',
    totalPrice: currentPayment ? currentPayment.totalPrice : '',
    payment: currentPayment?.payment,
  };

  const [form] = Form.useForm();

  // disable button when not input data
  const [disabledSave, setDisabledSave] = useState(true);
  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const hideModal = () => {
    dispatch(modalActions.hideModal());
  };

  const resetValues = () => {
    form.setFieldsValue(initialValues);
  };

  const onFinish = (values: any) => {
    if (currentPayment) {
      const formData = {
        fullname: values.fullName,
        status: values.status,
        phone: values.phone,
        city: values.city,
        district: values.district,
        ward: values.ward,
        shippingCost: values.shippingCost,
        totalPrice: values.totalPrice,
        payment: values.payment,
        point: currentPayment.point,
        street: currentPayment.street,
      };
      dispatch(
        paymentActions.editPayment({
          token: user.accessToken,
          dispatch,
          data: { ...formData, id: currentPayment.id, resetValues },
        })
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>
      <Modal
        title={title}
        open={isModal}
        destroyOnClose
        centered
        onOk={form.submit}
        onCancel={hideModal}
        okText="Lưu"
        cancelText="Quay lại"
        width={1250}
        okButtonProps={{ disabled: disabledSave }}
      >
        <Form
          initialValues={initialValues}
          form={form}
          onFieldsChange={handleFormChange}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <Col xl={12} md={12}>
              <Form.Item
                label="Họ tên"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Tỉnh/Thành phố"
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Quận/huyện"
                name="district"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Phường/xã"
                name="ward"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xl={12} md={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Select
                  showSearch
                  // placeholder="Select a person"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onSearch={onSearch}
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 'Chờ xử lí',
                      label: 'Chờ xử lí',
                    },
                    {
                      value: 'Đang giao hàng',
                      label: 'Đang giao hàng',
                    },
                    {
                      value: 'Đã giao hàng',
                      label: 'Đã giao hàng',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Phí vận chuyển"
                name="shippingCost"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Tổng tiền"
                name="totalPrice"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Hình thức thanh toán"
                name="payment"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Select
                  disabled
                  showSearch
                  // placeholder="Select a person"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onSearch={onSearch}
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 1,
                      label: 'Thanh toán bằng tiền mặt',
                    },
                    {
                      value: 2,
                      label: 'Thanh toán online',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ModalOrder;
