import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import { AlignType } from 'rc-table/lib/interface';

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { utils, writeFileXLSX } from 'xlsx';
import { productApi } from '../../../../apis/productApi';
import { authSelector, authState } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import {
  productActions,
  productSelector,
  productState,
} from '../../../../redux/slice/productSlice';
import { IProduct } from '../../../../types/product';
import ModalProductImage from '../ProductImage/ProductImage';
import ModalProductVariant from '../ProductVariant/ProductVariant';
import { castToVND } from '../../../../utils';
import { paymentApi } from '../../../../apis/paymentApi';
import { Payment } from '../../../../types/payment';
import { AiOutlineCheckSquare } from 'react-icons/ai';

const { Text } = Typography;

const TableProduct: React.FC = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [payment, setPayment] = useState<Payment[]>([]);

  const { products, isLoading, page, pageSize }: productState =
    useSelector(productSelector);

  const { isModal } = useSelector(modalSelector);

  const { user }: authState = useSelector(authSelector);

  const navigate = useNavigate();

  const handleModal = (record: IProduct) => {
    dispatch(productActions.setProduct(record));
    dispatch(modalActions.showModal('Hình ảnh sản phẩm'));
  };

  const handleModalAddVariant = (record: IProduct) => {
    dispatch(productActions.setProduct(record));
    setIsModalOpen(true);
  };

  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   width: 50,
    // },
    {
      title: 'Mã sản phẩm',
      render: (text: string, record: IProduct) => {
        return <Text mark>{record?.code}</Text>;
      },
    },
    {
      title: 'Hình ảnh',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string, record: IProduct) => {
        return record?.thumbnail !== '' ? (
          <div className="cursor-text">
            <img
              src={record?.thumbnail}
              alt=""
              className="w-20 h-14 object-cover"
            />
          </div>
        ) : (
          <></>
        );
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text: string, record: IProduct) => {
        return (
          <div>
            <span
              className="cursor-pointer text-blue-600 hover:text-blue-400"
              // onClick={() => {
              //   handleEditProduct(record);
              // }}
            >
              {record?.name}
            </span>
          </div>
        );
      },
    },

    {
      title: 'Danh mục sản phẩm',
      dataIndex: 'productCategoryId',
      render: (text: string, record: IProduct) => {
        return (
          <div>
            <Tag color="green" className="border-0 text-xl">
              {record?.productCategory && record?.productCategory?.name}
            </Tag>
          </div>
        );
      },
    },
    {
      title: 'Hình ảnh',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string, record: IProduct) => {
        return (
          <span
            className="cursor-pointer uppercase text-red-500"
            onClick={() => {
              handleModal(record);
            }}
          >
            Thiết lập
          </span>
        );
      },
    },
    {
      title: 'Biến thể',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string, record: IProduct) => {
        return (
          <span
            className="cursor-pointer uppercase text-red-500"
            onClick={() => {
              handleModalAddVariant(record);
            }}
          >
            Thiết lập
          </span>
        );
      },
    },
    {
      title: 'Giá',
      align: 'center' as AlignType,
      render: (text: string, record: IProduct) => {
        return (
          <div>
            <Tag color="#108ee9" className="text-2xl">
              {castToVND(record?.price)}
            </Tag>
          </div>
        );
      },
    },
    // {
    //   title: 'Ngày tạo',
    //   width: 100,
    //   align: 'center' as AlignType,
    //   render: (text: string, record: IProduct) => {
    //     let date = moment(record?.createdAt).format('MM/DD/YYYY');
    //     return <div>{date}</div>;
    //   },
    // },
    {
      title: 'Trạng thái',
      align: 'center' as AlignType,
      render: (text: string, record: IProduct) => {
        return record.isActive ? (
          <Tag color="red">Ngừng kinh doanh</Tag>
        ) : (
          <Tag color="blue">Đang kinh doanh</Tag>
        );
      },
    },
    {
      title: 'Hành động',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string, record: IProduct) => {
        const check = payment.find((item: Payment) =>
          item.paymentItems.some(
            (p: any) => p.productVariant.product.id === record.id
          )
        );
        return (
          <Space size="middle">
            {!check && record.isActive === false && (
              <EditOutlined
                className="common-icon-edit"
                onClick={() => {
                  handleEditProduct(record);
                }}
              />
            )}
            {!check && record.isActive === false && (
              <Popconfirm
                placement="topRight"
                title={`Bạn có muốn ngừng kinh doanh sản phẩm này!`}
                onConfirm={() => {
                  // confirm(record);
                  handleActive(record);
                }}
                okText="Có"
                cancelText="Không"
              >
                <AiOutlineCheckSquare className="common-icon-delete cursor-pointer" />
              </Popconfirm>
            )}
            {/* <Popconfirm
              placement="topRight"
              title={`Bạn có muốn xóa??`}
              onConfirm={() => {
                confirm(record);
              }}
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined className="common-icon-delete" />
            </Popconfirm> */}
          </Space>
        );
      },
    },
  ];

  const handleActive = (record: IProduct) => {
    if (user) {
      dispatch(
        productActions.activeProduct({
          token: user.accessToken,
          dispatch,
          data: {
            id: record.id,
            isActive: true,
          },
          params: {
            p: page,
            limit: pageSize,
          },
        })
      );
    }
  };

  const onFinish = (values: any) => {
    dispatch(
      productActions.getAllProduct({
        p: page,
        limit: pageSize,
        [values.option]: values.search,
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function confirm(record: any) {
    dispatch(
      productActions.deleteProduct({
        token: user.accessToken,
        dispatch,
        id: record.id,
        params: {
          p: page,
          limit: pageSize,
        },
      })
    );
  }

  const handleAddNewProduct = () => {
    dispatch(productActions.setProduct(null));
    navigate('/admin/product/create');
  };

  const handleEditProduct = (record: any) => {
    dispatch(productActions.setProduct(record));
    navigate(`/admin/product/edit/${record.id}`);
  };

  const handleExportExcel = () => {
    try {
      const getAllProduct = async () => {
        const data = await productApi.getAll();
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: IProduct) => ({
            name: item.name,
            productCategoryId: item.productCategoryId,
            price: item.price,
            priceSale: item.priceSale,
            description: item.description,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'product');
        writeFileXLSX(wb, 'Product.xlsx');
      };
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await paymentApi.getAllPaymentItem(
        user.accessToken,
        dispatch
      );
      const { data, status } = res;
      if (status === 200) {
        setPayment(data.data.rows);
      }
    })();
    try {
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, user.accessToken]);

  return (
    <React.Fragment>
      {isModal && <ModalProductImage />}
      {isModalOpen && (
        <ModalProductVariant
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <Row className="common-row-cus">
        <Col xl={18} style={{ paddingInline: '5px' }}>
          <Form
            form={form}
            initialValues={{ option: 'name', search: '' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="common-form-cus"
          >
            <div style={{ display: 'flex' }}>
              <Form.Item
                name="option"
                style={{
                  paddingRight: '10px',
                }}
              >
                <Select style={{ width: 120, borderRadius: '5px' }}>
                  <Select.Option value="name">Tên</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="search">
                <Input allowClear placeholder="Tìm kiếm" />
              </Form.Item>
            </div>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(false) ||
                    form
                      .getFieldsError()
                      .filter(({ errors }: any) => errors.length).length > 0
                  }
                >
                  Tìm kiếm
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
        <Col
          xl={4}
          style={{
            textAlign: 'center',
          }}
        >
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExportExcel}
          >
            Excel
          </Button>
        </Col>
        <Col
          xl={2}
          style={{
            textAlign: 'center',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              handleAddNewProduct();
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={products.rows.map((item: IProduct) => {
              return {
                ...item,
                key: item.id,
              };
            })}
            loading={isLoading}
            columns={columns}
            pagination={false}
            expandable={{ showExpandColumn: false }}
            size="small"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TableProduct;
