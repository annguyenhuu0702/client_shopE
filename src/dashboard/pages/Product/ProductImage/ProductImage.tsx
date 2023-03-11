import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Form, message, Modal, Row, Select, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productImageApi } from '../../../../apis/productImage';
import { variantValueApi } from '../../../../apis/variantValueApi';
import { URL_API } from '../../../../constants';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import {
  productImageActions,
  productImageSelector,
} from '../../../../redux/slice/productImageSlice';
import { productSelector } from '../../../../redux/slice/productSlice';
import { variantValue } from '../../../../types/variantValue';
import { AiFillDelete, AiFillCheckSquare } from 'react-icons/ai';
import { productImage } from '../../../../types/productImage';

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

const ModalProductImage: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user } = useSelector(authSelector);
  const { isModal, title } = useSelector(modalSelector);
  const { currentProduct } = useSelector(productSelector);
  const { productImages } = useSelector(productImageSelector);

  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState<string>();

  // lúc thêm ảnh
  const [pathImgs, setPathImgs] = useState<
    Array<{
      path: string;
      variantValueId: number;
    }>
  >([]);

  // sửa ảnh
  const [updateImages, setUpdateImages] = useState<productImage[]>([]);

  const [variantValues, setVariantValues] = useState<variantValue[]>([]);

  const [listId, setListId] = useState<number[]>([]);
  const [thumbnail, setThumbnail] = useState<string>('');

  const getVariantColors = useMemo(() => {
    return variantValues.filter((item) => item.variantId === 2);
  }, [variantValues]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    dispatch(modalActions.hideModal());
  };

  const onFinish = async (values: any) => {
    console.log({ listId, updateImages, pathImgs, thumbnail });
    if (currentProduct) {
      try {
        await productImageApi.createMany(user.accessToken, dispatch, {
          pathImgs,
          productId: currentProduct.id,
          listId,
          updateImages,
          thumbnail,
        });
        dispatch(modalActions.hideModal());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleChangColors = (value: any, item: any) => {
    setUpdateImages((state) =>
      state.map((s: any) =>
        s.path === item.path ? { ...s, variantValueId: value } : s
      )
    );
  };

  const handleSelectThumbnail = (path: string) => {
    setThumbnail(path);
  };

  const handleDeleteImage = (id: number) => {
    setListId((state) => {
      return [...state, id];
    });
  };

  const handleDeleteImageOnUpload = (path: string) => {
    setPathImgs((state) => {
      return state.filter((item) => item.path !== path);
    });
  };

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setPathImgs(
        info.fileList.map((file: any) => ({
          path: file.response.data[0].secure_url,
          variantValueId: null,
        })) as any
      );
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await variantValueApi.getAll({
          variantName: 'Màu sắc',
        });
        setVariantValues(data.data.rows);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentProduct) {
      dispatch(
        productImageActions.getAllProductImage({
          productId: `${currentProduct?.id}`,
        })
      );
      setThumbnail(currentProduct.thumbnail);
    }
  }, [dispatch, currentProduct]);

  useEffect(() => {
    setUpdateImages(productImages.rows);
  }, [productImages]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Modal
      title={title}
      open={isModal}
      centered
      destroyOnClose
      width={1000}
      okText="Lưu"
      cancelText="Quay lại"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="upload-image"
        form={form}
        autoComplete="off"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item>
          <Upload
            name="images"
            listType="picture-card"
            multiple
            className="avatar-uploader"
            showUploadList={true}
            action={`${URL_API}/upload/multiple`}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
        </Form.Item>
        <Row gutter={[16, 16]}>
          {/* lúc upload ảnh thì cái này chạy */}
          {pathImgs.map((item: any) => {
            return (
              <Col key={item.path} xl={6}>
                <div className="overflow-hidden">
                  <div
                    className="h-0 relative"
                    style={{
                      paddingBottom: '130%',
                    }}
                  >
                    <img src={item.path} alt="" className="w-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>
                    Chọn màu
                  </span>
                  <Select
                    className="w-full"
                    onChange={(value: any) => {
                      setPathImgs((state) =>
                        state.map((s: any) =>
                          s.path === item.path
                            ? { ...s, variantValueId: value }
                            : s
                        )
                      );
                    }}
                  >
                    {getVariantColors.map((variantValue) => (
                      <Select.Option
                        key={variantValue.id}
                        value={variantValue.id}
                      >
                        {variantValue.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="mt-2 flex justify-between">
                  <span
                    className="text-3xl"
                    onClick={() => {
                      handleDeleteImageOnUpload(item.path);
                    }}
                  >
                    <AiFillDelete />
                  </span>
                  {item.path === thumbnail ? (
                    <></>
                  ) : (
                    <span
                      className="text-3xl"
                      onClick={() => {
                        handleSelectThumbnail(item.path);
                      }}
                    >
                      <AiFillCheckSquare />
                    </span>
                  )}
                </div>
              </Col>
            );
          })}
          {/* có productImage thì cái này chạy */}
          {productImages.rows.length > 0 &&
            productImages.rows.map((item: any, index: number) => {
              if (listId.includes(item.id))
                return <React.Fragment key={item.id}></React.Fragment>;
              return (
                <Col key={item.path} xl={6}>
                  <div className="overflow-hidden">
                    <div
                      className="h-0 relative"
                      style={{
                        paddingBottom: '130%',
                      }}
                    >
                      <img src={item.path} alt="" className="w-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>
                      Chọn màu
                    </span>
                    <Select
                      value={updateImages[index]?.variantValueId}
                      className="w-full"
                      onChange={(value: any) => {
                        handleChangColors(value, item);
                      }}
                    >
                      {getVariantColors.map((variantValue) => (
                        <Select.Option
                          key={variantValue.id}
                          value={variantValue.id}
                        >
                          {variantValue.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span
                      className="text-3xl"
                      onClick={() => {
                        handleDeleteImage(item.id);
                      }}
                    >
                      <AiFillDelete />
                    </span>
                    {item.path === thumbnail ? (
                      <></>
                    ) : (
                      <span
                        className="text-3xl"
                        onClick={() => {
                          handleSelectThumbnail(item.path);
                        }}
                      >
                        <AiFillCheckSquare />
                      </span>
                    )}
                  </div>
                </Col>
              );
            })}
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalProductImage;
