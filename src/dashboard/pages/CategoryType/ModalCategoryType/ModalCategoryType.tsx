import React, { useState } from 'react';

import { Col, Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  modalActions,
  modalSelector,
  modalState,
} from '../../../../redux/slice/modalSlice';
import { authSelector, authState } from '../../../../redux/slice/authSlice';
import {
  categoryTypeActions,
  categoryTypeSelector,
  categoryTypeState,
} from '../../../../redux/slice/categoryTypeSlice';

const ModalCategoryType: React.FC = () => {
  const dispatch = useDispatch();

  const { user }: authState = useSelector(authSelector);
  const { isModal, title }: modalState = useSelector(modalSelector);
  const { currentCategoryType }: categoryTypeState =
    useSelector(categoryTypeSelector);

  const initialValues = {
    name: currentCategoryType ? currentCategoryType.name : '',
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
    const data = { ...currentCategoryType, ...values };
    const { key, ...others } = data;
    if (currentCategoryType === null) {
      dispatch(
        categoryTypeActions.createCategoryType({
          token: user.accessToken,
          dispatch,
          data: { ...values, resetValues },
        })
      );
    } else {
      dispatch(
        categoryTypeActions.editCategoryType({
          token: user.accessToken,
          dispatch,
          data: { ...others, resetValues },
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
        visible={isModal}
        destroyOnClose
        centered
        onOk={form.submit}
        onCancel={hideModal}
        okText="Save"
        cancelText="Back"
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
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <Col xl={24} md={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please fill in this field!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ModalCategoryType;
