import React, { useEffect, useState } from 'react';

import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Tag,
} from 'antd';
import moment from 'moment';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import {
  productCategoryActions,
  productCategorySelector,
} from '../../../../redux/slice/productCategorySlice';
import {
  discountActions,
  discountSelector,
} from '../../../../redux/slice/discountSlice';

const ModalPromotion: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { user } = useSelector(authSelector);

  const { productCategories } = useSelector(productCategorySelector);
  const { currentDiscount } = useSelector(discountSelector);

  const { isModal, title } = useSelector(modalSelector);

  const initialValues = {
    name: currentDiscount ? currentDiscount.name : '',
    productCategoryId: [],
    startday: currentDiscount
      ? moment(new Date(currentDiscount.startday))
      : moment(Date.now()),
    endday: currentDiscount ? moment(new Date(currentDiscount.endday)) : null,
    percent: currentDiscount ? currentDiscount.percent : 0,
  };

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
      productCategoryId: values.productCategoryId,
      startday: values.startday,
      endday: values.endday,
      percent: values.percent,
    };

    if (currentDiscount === null) {
      dispatch(
        discountActions.createDiscount({
          token: user.accessToken,
          dispatch,
          data: { ...formData, resetValues },
        })
      );
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="blue"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  useEffect(() => {
    dispatch(productCategoryActions.getAllProductCategory({}));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Modal
        title={title}
        open={isModal}
        destroyOnClose
        maskClosable={false}
        centered
        onOk={form.submit}
        onCancel={hideModal}
        okText="Lưu"
        cancelText="Quay lại"
        width={600}
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
          <Row>
            <Col xl={24} md={24}>
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
            </Col>
            <Col xl={24} md={24}>
              <Form.Item
                label="Danh mục sản phẩm"
                name="productCategoryId"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  options={
                    productCategories &&
                    productCategories.rows.map((item) => {
                      return {
                        key: item.id,
                        value: item.id,
                        label: item.name,
                      };
                    })
                  }
                  filterOption={(input, option: any) => {
                    return (
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    );
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={24} md={24}>
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
            </Col>
            <Col xl={24} md={24}>
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
            <Col xl={24} md={24}>
              <Form.Item
                label="Giá trị giảm (%)"
                name="percent"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống!',
                  },
                ]}
              >
                <InputNumber className="w-full" min={1} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ModalPromotion;
