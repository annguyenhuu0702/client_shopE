import React, { useState } from 'react';

import { Col, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  couponActions,
  couponSelector,
} from '../../../../redux/slice/couponSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import { makeid } from '../../../../utils';
import moment from 'moment';

const newData = [
  {
    value: 'freeship',
    label: 'Miễn phí ship',
  },
  {
    value: 'discountorder',
    label: 'Giảm % tiền trên tổng giá đơn hàng',
  },
];

const ModalCoupon: React.FC = () => {
  const dispatch = useDispatch();

  const [typeCoupon, setTypeCoupon] = useState<string>('');

  const { user } = useSelector(authSelector);

  const { currentCoupon } = useSelector(couponSelector);

  const { isModal, title } = useSelector(modalSelector);

  const initialValues = {
    name: currentCoupon ? currentCoupon.name : '',
    description: currentCoupon ? currentCoupon.description : '',
    type: currentCoupon ? currentCoupon.type : '',
    startday: currentCoupon
      ? moment(new Date(currentCoupon.startday))
      : moment(Date.now()),
    endday: currentCoupon ? moment(new Date(currentCoupon.endday)) : null,
    percent: currentCoupon ? currentCoupon.percent : 1,
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
    const formData = {
      name: values.name,
      description: values.description,
      type: values.type,
      slug: values.name + makeid(5),
      startday: values.startday,
      endday: values.endday,
      percent: values.percent === undefined ? 1 : +values.percent,
    };
    dispatch(
      couponActions.createCoupon({
        token: user.accessToken,
        dispatch,
        data: { ...formData, resetValues },
      })
    );
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
        width={1000}
        okButtonProps={{ disabled: disabledSave }}
        maskClosable={false}
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
                label="Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Loại"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Select
                  showArrow
                  onChange={(value) => {
                    setTypeCoupon(value);
                  }}
                  options={
                    newData &&
                    newData.map((item) => {
                      return {
                        label: item.label,
                        value: item.value,
                      };
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={12} md={12}>
              {typeCoupon === 'discountorder' && (
                <Form.Item
                  label="Phần trăm"
                  name="percent"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              <Form.Item
                label="Ngày bắt đầu"
                name="startday"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <DatePicker placeholder="Chọn ngày" format="MM/DD/YYYY" />
              </Form.Item>
              <Form.Item
                label="Ngày kết thúc"
                name="endday"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <DatePicker placeholder="Chọn ngày" format="MM/DD/YYYY" />
              </Form.Item>
            </Col>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ModalCoupon;
