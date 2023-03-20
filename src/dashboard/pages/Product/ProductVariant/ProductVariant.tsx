import { Button, Col, Form, InputNumber, Modal, Row } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productVariantApi } from '../../../../apis/productVariant';
import { variantValueApi } from '../../../../apis/variantValueApi';
import { authSelector } from '../../../../redux/slice/authSlice';
import { productSelector } from '../../../../redux/slice/productSlice';
import { productVariantActions } from '../../../../redux/slice/productVariantSlice';
import { ICreateProductVariant } from '../../../../types/productVariant';
import { IVariantValue } from '../../../../types/variantValue';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

const ModalProductVariant: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  // b1: Gọi api lấy variant value
  // b2: tạo state colors với sizes để lưu lại khi click chọn
  // b3: tạo productVariants để kết hợp màu với kích thước rồi render xuống dưới

  const dispatch = useDispatch();

  const { currentProduct } = useSelector(productSelector);
  const { user } = useSelector(authSelector);

  const [variantValues, setVariantValues] = useState<IVariantValue[]>([]);
  const [colors, setColors] = useState<IVariantValue[]>([]);
  const [sizes, setSizes] = useState<IVariantValue[]>([]);
  const [productVariants, setProductVariants] = useState<
    ICreateProductVariant[]
  >([]);

  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async () => {
    console.log('check data>>>>>>>>>', productVariants);
    dispatch(
      productVariantActions.createProductVariant({
        token: user.accessToken,
        dispatch,
        data: productVariants,
      })
    );
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const getVariantColors = useMemo(() => {
    return variantValues.reverse().filter((item) => item.variantId === 2);
  }, [variantValues]);

  const getVariantSizes = useMemo(() => {
    return variantValues.filter((item) => item.variantId === 1);
  }, [variantValues]);

  const handleAddSize = (item: IVariantValue) => {
    setSizes((state) => {
      const newArr = [...state];
      let index = newArr.findIndex((data) => data.id === item.id);
      if (index !== -1) {
        newArr.splice(index, 1);
      } else {
        newArr.push(item);
      }
      return newArr;
    });
  };

  const handleAddColor = (item: IVariantValue) => {
    setColors((state) => {
      const newArr = [...state];
      let index = newArr.findIndex((data) => data.id === item.id);
      if (index !== -1) {
        newArr.splice(index, 1);
      } else {
        newArr.push(item);
      }
      return newArr;
    });
  };

  const handleGenerateProductVariants = () => {
    if (currentProduct) {
      const data: ICreateProductVariant[] = [];
      colors.forEach((color) => {
        sizes.forEach((size) => {
          data.push({
            productId: currentProduct.id,
            inventory: 0,
            name: `${color.name} / ${size.name}`,
            variantValues: [color, size],
          });
        });
      });
      setProductVariants(data);
    }
  };

  useEffect(() => {
    const getAllVariantValue = async () => {
      try {
        const { data } = await variantValueApi.getAll({});
        setVariantValues(data.data.rows);
      } catch (error) {
        console.log(error);
      }
    };
    getAllVariantValue();
  }, []);

  useEffect(() => {
    if (currentProduct) {
      const getAllProductVariant = async () => {
        try {
          const { data } = await productVariantApi.getAll({
            productId: currentProduct.id,
          });
          console.log(data);
          // setProductVariants(data.data.rows);
        } catch (error) {
          console.log(error);
        }
      };
      getAllProductVariant();
    }
  }, [currentProduct]);

  return (
    <div>
      <Modal
        title="Biến thể sản phẩm"
        open={isModalOpen}
        centered
        destroyOnClose
        width="50vw"
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
          <div>
            <div className="border border-solid p-6">
              <span className="block mb-2 font-semibold text-2xl">Kích cỡ</span>
              <div>
                {getVariantSizes.map((item) => {
                  return (
                    <div
                      className={`inline-block text-2xl mb-6 p-4 mr-4 cursor-pointer text-black border border-solid ${
                        sizes.find((color) => color.id === item.id)
                          ? 'bg-blue-700 text-white'
                          : ''
                      }`}
                      key={item.id}
                      onClick={() => {
                        handleAddSize(item);
                      }}
                    >
                      <span className="">{item.name}</span>
                    </div>
                  );
                })}
              </div>
              <span className="block mb-2 font-semibold text-2xl">Màu sắc</span>
              <div>
                {getVariantColors.map((item) => {
                  return (
                    <div
                      className={`inline-block text-2xl mb-6 p-4 mr-4 cursor-pointer text-black border border-solid ${
                        colors.find((size) => size.id === item.id)
                          ? 'bg-blue-700 text-white'
                          : ''
                      }`}
                      key={item.id}
                      onClick={() => {
                        handleAddColor(item);
                      }}
                    >
                      <span className="">{item.name}</span>
                    </div>
                  );
                })}
              </div>
              <div>
                <Button
                  htmlType="button"
                  type="primary"
                  onClick={() => {
                    handleGenerateProductVariants();
                  }}
                >
                  Tạo
                </Button>
              </div>
            </div>
          </div>
          <div className="border border-solid p-6 mt-8">
            <span className="block mb-2">Các biến thể sản phẩm</span>
            <Row>
              <Col xl={5}>
                <div>
                  <span className="text-2xl font-semibold">Tên</span>
                </div>
              </Col>
              <Col>
                <span className="text-2xl font-semibold">Số lượng</span>
              </Col>
            </Row>
            {productVariants.map((productVariant) => {
              return (
                <Row key={productVariant.name}>
                  <Col xl={5} className="flex items-center">
                    <div>{productVariant.name}</div>
                  </Col>
                  <Col xl={5}>
                    <InputNumber
                      className="w-full"
                      value={productVariant.inventory}
                      onChange={(value) => {
                        setProductVariants((state) =>
                          state.map((item) =>
                            item.name === productVariant.name
                              ? { ...item, inventory: +`${value}` }
                              : item
                          )
                        );
                      }}
                    />
                  </Col>
                </Row>
              );
            })}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalProductVariant;
