import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../../redux/slice/authSlice';
import { newsApi } from '../../../../apis/newsApi';
import { newsActions, newsSelector } from '../../../../redux/slice/newsSlice';
import HeaderTitle from '../../../components/HeaderTitle/HeaderTitle';
import { useTitle } from '../../../../hooks/useTitle';
import Upload, { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { UploadProps } from 'antd/lib/upload';
import { useNavigate, useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import TextArea from 'antd/es/input/TextArea';

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

const FormNews: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = useSelector(authSelector);
  const { currentNews } = useSelector(newsSelector);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [pathImg, setPathImg] = useState<string>(
    currentNews ? currentNews.thumbnail : ''
  );

  const [form] = Form.useForm();

  const initialValues = {
    title: currentNews ? currentNews.title : '',
    content: currentNews ? currentNews.content : '',
    thumbnail: currentNews ? currentNews.thumbnail : '',
  };

  const onFinish = async (values: any) => {
    if (user.user) {
      const formData = {
        title: values.title,
        thumbnail: pathImg,
        content: values.content,
        userId: user.user.id,
      };
      if (currentNews === null) {
        if (user.user) {
          dispatch(
            newsActions.createNews({
              token: user.accessToken,
              dispatch,
              data: { ...formData },
              navigate,
            })
          );
        }
      } else {
        dispatch(
          newsActions.editNews({
            token: user.accessToken,
            dispatch,
            data: { ...formData, id: currentNews.id },
            navigate,
          })
        );
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setPathImg(info.file.response.data.secure_url);
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

  useEffect(() => {
    try {
      const getNewsById = async () => {
        if (id) {
          const res = await newsApi.getById(user.accessToken, dispatch, id);
          const { data } = res.data;
          dispatch(newsActions.setNews(data));
          form.setFieldsValue({
            title: data.title,
            content: data.content,
            thumbnail: data.thumbnail,
          });
        }
      };
      getNewsById();
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch, form, user.accessToken]);

  useEffect(() => {
    setPathImg(currentNews ? currentNews.thumbnail : '');
  }, [currentNews]);

  useTitle(currentNews ? 'Sửa bài viết' : 'Thêm bài viết');
  return (
    <section className="section-common">
      <HeaderTitle title={currentNews ? 'Sửa bài viết' : 'Thêm bài viết'} />
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
                  label="Tiêu đề"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                  ]}
                >
                  <TextArea rows={2} />
                </Form.Item>
                <Form.Item
                  label="Hình ảnh"
                  name="thumbnail"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                  ]}
                >
                  <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${URL_API}/upload/single`}
                    beforeUpload={beforeUpload}
                    onChange={handleChangeUpload}
                  >
                    {pathImg ? (
                      <img
                        src={pathImg}
                        alt="avatar"
                        style={{
                          width: '90px',
                          height: '90px',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Nội dung"
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống!',
                    },
                  ]}
                >
                  <ReactQuill theme="snow" />
                </Form.Item>
                <Form.Item
                  shouldUpdate
                  style={{
                    textAlign: 'center',
                  }}
                  wrapperCol={{ span: 14 }}
                >
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        !form.isFieldsTouched(false) ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                      style={{
                        width: '200px',
                      }}
                      size="large"
                    >
                      {currentNews ? 'Sửa' : 'Thêm'}
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

export default FormNews;
