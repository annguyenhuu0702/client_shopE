import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, message, Select } from 'antd';
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/lib/upload';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, authState } from '../../../../redux/slice/authSlice';
import {
  categoryActions,
  categorySelector,
  categoryState,
} from '../../../../redux/slice/categorySlice';
import {
  categoryTypeActions,
  categoryTypeSelector,
  categoryTypeState,
} from '../../../../redux/slice/categoryTypeSlice';
import { categoryType } from '../../../../types/categortType';
import { category } from '../../../../types/category';
import { slugify } from '../../../../utils';
import HeaderTitle from '../../../components/HeaderTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryApi } from '../../../../apis/categoryApi';

const { Content } = Layout;

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

const FormCategory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user }: authState = useSelector(authSelector);
  const { categoriesType }: categoryTypeState =
    useSelector(categoryTypeSelector);

  const { categories, currentCategory }: categoryState =
    useSelector(categorySelector);

  const initialValues = {
    name: currentCategory ? currentCategory.name : '',
    thumbnail: currentCategory ? currentCategory.thumbnail : '',
    title: currentCategory ? currentCategory.title : '',
    categoryTypeId: currentCategory ? currentCategory.categoryTypeId : -1,
    parentId: currentCategory ? currentCategory.parentId : -1,
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();

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

  const resetValues = () => {
    form.setFieldsValue(initialValues);
  };

  const onFinish = (values: any) => {
    const formData = {
      thumbnail: values.thumbnail,
      title: values.title,
      name: values.name,
      categoryTypeId:
        values.categoryTypeId === -1 ? null : values.categoryTypeId,
      slug: slugify(values.name),
      parentId: values.parentId === -1 ? null : values.parentId,
    };
    if (currentCategory === null) {
      dispatch(
        categoryActions.createCategory({
          token: user.accessToken,
          dispatch,
          data: { ...formData, resetValues },
          navigate,
        })
      );
    } else {
      dispatch(
        categoryActions.editCategory({
          token: user.accessToken,
          dispatch,
          data: { ...formData, id: currentCategory.id, resetValues },
          navigate,
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

  useEffect(() => {
    dispatch(categoryTypeActions.getAllCategoryType({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(categoryActions.getAllCategory({}));
  }, [dispatch]);

  useEffect(() => {
    const getCategoryById = async () => {
      if (id) {
        const res = await categoryApi.getById(id);
        const { data } = res.data;
        dispatch(categoryActions.setCategory(data));
        form.setFieldsValue({
          name: data.name,
          thumbnail: data.thumbnail,
          title: data.title,
          categoryTypeId: data.categoryTypeId,
          parentId: data.parentId,
        });
      }
    };
    getCategoryById();
  }, [id, dispatch, form]);

  return (
    <section className="section-common">
      <HeaderTitle
        title={currentCategory ? 'Edit category' : 'Create category'}
      />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <Form
              initialValues={initialValues}
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 10 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              labelAlign="left"
            >
              <div>
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
                  label="Category type"
                  name="categoryTypeId"
                  rules={[
                    {
                      required: true,
                      message: 'Please fill in this field!',
                    },
                  ]}
                >
                  <Select onChange={handleChange}>
                    <Select.Option value={-1}>No category type</Select.Option>
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
                  label="Parent"
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
                <Form.Item
                  style={{
                    textAlign: 'center',
                  }}
                  wrapperCol={{ span: 14 }}
                  shouldUpdate
                >
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: '200px',
                      }}
                      size="large"
                      disabled={
                        !form.isFieldsTouched(false) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length > 0
                      }
                    >
                      {currentCategory ? 'Edit' : 'Create'}
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </Content>
    </section>
  );
};

export default FormCategory;
