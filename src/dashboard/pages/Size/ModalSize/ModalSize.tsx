import React, { useState } from 'react';

import { Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import {
  variantValueActions,
  variantValueSelector,
} from '../../../../redux/slice/variantValueSlice';

const ModalSize: React.FC = () => {
  const dispatch = useDispatch();

  const { currentSize } = useSelector(variantValueSelector);

  const { user } = useSelector(authSelector);

  const { isModal, title } = useSelector(modalSelector);

  const initialValues = {
    name: currentSize ? currentSize.name : '',
    variantId: 'Kích cỡ',
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
      variantId: 1,
    };
    if (currentSize === null) {
      dispatch(
        variantValueActions.createSize({
          token: user.accessToken,
          dispatch,
          data: { ...formData, resetValues },
        })
      );
    } else {
      dispatch(
        variantValueActions.editSize({
          token: user.accessToken,
          dispatch,
          data: { ...formData, id: currentSize.id, resetValues },
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
        width={500}
        okButtonProps={{ disabled: disabledSave }}
      >
        <Form
          initialValues={initialValues}
          form={form}
          onFieldsChange={handleFormChange}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
          layout="vertical"
        >
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
            label="Thể loại"
            name="variantId"
            rules={[
              {
                required: true,
                message: 'Vui lòng không bỏ trống!',
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ModalSize;
