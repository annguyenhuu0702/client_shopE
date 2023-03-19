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
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
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

const TableProduct: React.FC = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    {
      title: 'Hình ảnh',
      width: '100px',
      render: (text: string, record: IProduct) => {
        return record.thumbnail !== '' ? (
          <div className="flex justify-center cursor-text">
            <img
              src={record.thumbnail}
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
    },

    {
      title: 'Danh mục sản phẩm',
      dataIndex: 'productCategoryId',
      render: (text: string, record: IProduct) => {
        return <div>{record.productCategory.name}</div>;
      },
    },
    {
      title: 'Hình ảnh',
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
      title: 'Ngày tạo',
      render: (text: string, record: IProduct) => {
        let date = moment(record.createdAt).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Hành động',
      // dataIndex: 'action',
      render: (text: string, record: IProduct) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="common-icon-edit"
              onClick={() => {
                handleEditProduct(record);
              }}
            />
            <Popconfirm
              placement="topRight"
              title={`Bạn có muốn xóa??`}
              onConfirm={() => {
                confirm(record);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="common-icon-delete" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

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
            size="middle"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TableProduct;
