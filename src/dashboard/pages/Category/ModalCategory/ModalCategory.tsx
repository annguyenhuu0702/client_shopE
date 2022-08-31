import React, { useState } from 'react';

import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/lib/upload';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, message, Modal, Select, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, authState } from '../../../../redux/slice/authSlice';
import {
  categoryActions,
  categorySelector,
  categoryState,
} from '../../../../redux/slice/categorySlice';
import {
  categoryTypeSelector,
  categoryTypeState,
} from '../../../../redux/slice/categoryTypeSlice';
import {
  modalActions,
  modalSelector,
  modalState,
} from '../../../../redux/slice/modalSlice';
import { categoryType } from '../../../../types/categortType';
import { category, createCategory } from '../../../../types/category';
import { slugify } from '../../../../utils/index';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ModalCategory: React.FC = () => {
  const dispatch = useDispatch();

  const { user }: authState = useSelector(authSelector);
  const { isModal, title }: modalState = useSelector(modalSelector);
  const { categoriesType }: categoryTypeState =
    useSelector(categoryTypeSelector);

  const { categories, currentCategory }: categoryState =
    useSelector(categorySelector);

  const initialValues = {
    name: currentCategory ? currentCategory.name : '',
    thumbnail: currentCategory ? currentCategory.thumbnail : '',
    title: currentCategory ? currentCategory.title : '',
    description: currentCategory ? currentCategory.description : '',
    categoryTypeId: currentCategory ? currentCategory.categoryTypeId : '',
    parentId: currentCategory ? currentCategory.parentId : -1,
  };

  const [form] = Form.useForm();

  // disable button when not input data
  const [disabledSave, setDisabledSave] = useState(true);
  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChangeUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const hideModal = () => {
    dispatch(modalActions.hideModal());
  };

  const resetValues = () => {
    form.setFieldsValue(initialValues);
  };

  const onFinish = (values: any) => {
    const formData = {
      thumbnail: values.thumbnail,
      title: values.title,
      name: values.name,
      description: values.description,
      categoryTypeId: values.categoryTypeId,
      slug: slugify(values.name),
      parentId: values.parentId === -1 ? null : values.parentId,
    };

    if (currentCategory === null) {
      dispatch(
        categoryActions.createCategory({
          token: user.accessToken,
          dispatch,
          data: { ...formData, resetValues },
        })
      );
    } else {
      dispatch(
        categoryActions.editCategory({
          token: user.accessToken,
          dispatch,
          data: { ...formData, id: currentCategory.id, resetValues },
        })
      );
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
              <Form.Item label="Thumbnail">
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChangeUpload}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col xl={12} md={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please fill in this field!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please fill in this field!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="CategoryTypeId"
                name="categoryTypeId"
                rules={[
                  {
                    required: true,
                    message: 'Please fill in this field!',
                  },
                ]}
              >
                <Select onChange={handleChange}>
                  {categoriesType.rows.map((item: categoryType) => {
                    return (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="ParentId"
                name="parentId"
                rules={[
                  {
                    required: true,
                    message: 'Please fill in this field!',
                  },
                ]}
              >
                <Select onChange={handleChange}>
                  <Select.Option value={-1}>No parent</Select.Option>
                  {categories.rows.map((item: category) => {
                    return (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ModalCategory;
