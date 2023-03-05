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
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { utils, writeFileXLSX } from 'xlsx';
import { productCategoryApi } from '../../../../apis/productCategoryApi';
import { routes } from '../../../../config/routes';
import { authSelector, authState } from '../../../../redux/slice/authSlice';
import {
  productCategoryActions,
  productCategorySelector,
  productCategoryState,
} from '../../../../redux/slice/productCategorySlice';
import { productCategory } from '../../../../types/productCategory';
import {
  removeParenthesis,
  removeTextBetweenParentheses,
} from '../../../../utils';

const TableProductCategory: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { productCategories, isLoading, page, pageSize }: productCategoryState =
    useSelector(productCategorySelector);
  const { user }: authState = useSelector(authSelector);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Hình ảnh',
      width: '100px',
      render: (text: string, record: productCategory) => {
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
      title: 'Tên',
      render: (text: string, record: productCategory) => {
        return <div>{removeTextBetweenParentheses(record.name)}</div>;
      },
    },
    {
      title: 'Bộ sưu tập',
      render: (text: string, record: productCategory) => {
        // return <div>{removeParenthesis(record.collection?.name)}</div>;
        return <div>{record.collection?.name}</div>;
      },
    },
    {
      title: 'Ngày tạo',
      render: (text: string, record: any) => {
        let date = moment(record.createdAt).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (text: string, record: any) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="common-icon-edit"
              onClick={() => {
                handleEditProductCategory(record);
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
      productCategoryActions.getAllProductCategory({
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
      productCategoryActions.deleteProductCategory({
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

  const handleAddNewProductCategory = () => {
    dispatch(productCategoryActions.setProductCategory(null));
    navigate(routes.createProductCategoryAdmin);
  };

  const handleEditProductCategory = (record: any) => {
    dispatch(productCategoryActions.setProductCategory(record));
    navigate(`/admin/product-category/edit/${record.id}`);
  };

  const handleExportExcel = () => {
    try {
      const getAllProductCategory = async () => {
        const data = await productCategoryApi.getAll();
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: productCategory) => ({
            name: item.name,
            collection: item.collection.name,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'ProductCategory');
        writeFileXLSX(wb, 'ProductCategory.xlsx');
      };
      getAllProductCategory();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
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
              handleAddNewProductCategory();
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={productCategories.rows.map((item: productCategory) => {
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

export default TableProductCategory;
