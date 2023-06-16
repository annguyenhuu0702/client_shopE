import React, { useState } from 'react';
import { Col, Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import {
  productVariantActions,
  productVariantSelector,
} from '../../../../redux/slice/productVariantSlice';
import { authSelector } from '../../../../redux/slice/authSlice';

const ModalProductOutStock: React.FC = () => {
  const dispatch = useDispatch();

  const { currentProductVariant, page, pageSize } = useSelector(
    productVariantSelector
  );

  const { user } = useSelector(authSelector);

  const { isModal, title } = useSelector(modalSelector);

  const initialValues = {
    code: currentProductVariant ? currentProductVariant.product.code : '',
    name: currentProductVariant ? currentProductVariant.product.name : '',
    size: currentProductVariant
      ? currentProductVariant?.variantValues?.find(
          (item) => item?.variantId === 1
        )?.name
      : '',

    inventory: currentProductVariant ? currentProductVariant.inventory : '',
    color: currentProductVariant
      ? currentProductVariant?.variantValues?.find(
          (item) => item?.variantId === 2
        )?.name
      : '',

    addInventory: 1,
  };

  const [form] = Form.useForm();
  const [gender, setGender] = useState(1);

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
      inventory: +values.inventory + +values.addInventory,
    };

    if (currentProductVariant) {
      dispatch(
        productVariantActions.editProductOutStock({
          token: user.accessToken,
          dispatch,
          data: { ...formData, id: currentProductVariant.id, resetValues },
          params: {
            p: page,
            limit: pageSize,
          },
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
        width={1000}
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
                label="Mã sản phẩm"
                name="code"
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
                label="Tên sản phẩm"
                name="name"
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
                label="Kích thước"
                name="size"
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
                label="Nhập thêm"
                name="addInventory"
                rules={[
                  {
                    pattern: /^(?:\d*)$/,
                    message: 'Chỉ được nhập số',
                  },
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số lượng"
                name="inventory"
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
                label="Màu sắc"
                name="color"
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
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ModalProductOutStock;
