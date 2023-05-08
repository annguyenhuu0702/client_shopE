import { Form, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions, modalSelector } from '../../../redux/slice/modalSlice';
import TextArea from 'antd/es/input/TextArea';
import {
  commentActions,
  commentSelector,
} from '../../../redux/slice/commentSlice';
import { authSelector } from '../../../redux/slice/authSlice';
import { productSelector } from '../../../redux/slice/productSlice';

const ModalComment: React.FC = () => {
  const { isModal, title } = useSelector(modalSelector);
  const { currentComment } = useSelector(commentSelector);
  const { currentProductClient } = useSelector(productSelector);
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  // disable button when not input data
  const [disabledSave, setDisabledSave] = useState(true);
  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const initialValues = {
    content: currentComment ? currentComment.content : '',
  };

  const onFinish = (values: any) => {
    if (user && currentComment && currentProductClient) {
      dispatch(
        commentActions.editCommentByUser({
          token: user.accessToken,
          dispatch,
          data: {
            ...values,
            id: currentComment.id,
            productId: currentProductClient.id,
          },
        })
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Modal
      title={title}
      open={isModal}
      destroyOnClose
      centered
      onOk={form.submit}
      onCancel={hideModal}
      okText="Lưu"
      cancelText="Quay lại"
      okButtonProps={{ disabled: disabledSave }}
      maskClosable={false}
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
        <Form.Item name="content">
          <TextArea rows={4} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComment;
