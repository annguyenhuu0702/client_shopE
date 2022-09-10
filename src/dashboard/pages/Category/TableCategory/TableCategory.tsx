import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
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
import React from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { utils, writeFileXLSX } from 'xlsx';
import { categoryApi } from '../../../../apis/categoryApi';
import { authSelector, authState } from '../../../../redux/slice/authSlice';
import {
  categoryActions,
  categorySelector,
  categoryState,
} from '../../../../redux/slice/categorySlice';
import { category } from '../../../../types/category';

const TableCategory: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { categories, isLoading, page, pageSize }: categoryState =
    useSelector(categorySelector);
  const { user }: authState = useSelector(authSelector);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Category Type',
      dataIndex: 'categoryTypeId',
      render: (text: string, record: category) => record.categoryType?.name,
    },
    {
      title: 'Parent',
      dataIndex: 'categoryTypeId',
      render: (text: string, record: category) =>
        record.parent ? record.parent?.name : 'Không có',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      render: (text: string, record: category) => {
        let date = moment(record.createdAt).format('MM/DD/YYYY');
        return <React.Fragment>{date}</React.Fragment>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: string, record: category) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="common-icon-edit"
              onClick={() => {
                handleEditCategory(record);
              }}
            />
            <Popconfirm
              placement="topRight"
              title={`Do you want to delete this?`}
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
      categoryActions.getAllCategory({
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
      categoryActions.deleteCategory({
        token: user.accessToken,
        dispatch,
        id: record.id,
        p: page,
        limit: pageSize,
      })
    );
  }

  const handleAddNewCategory = () => {
    dispatch(categoryActions.setCategory(null));
    navigate('/admin/category/create');
  };

  const handleEditCategory = (record: any) => {
    dispatch(categoryActions.setCategory(record));
    navigate(`/admin/category/edit/${record.id}`);
  };

  const handleExportExcel = () => {
    try {
      const getAllCategory = async () => {
        const data = await categoryApi.getAll();
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: category) => ({
            name: item.name,
            title: item.title,
            categoryType: item.categoryType.name,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'Category');
        writeFileXLSX(wb, 'Category.xlsx');
      };
      getAllCategory();
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
                  <Select.Option value="name">Name</Select.Option>
                  <Select.Option value="categoryType">
                    Category Type
                  </Select.Option>
                  <Select.Option value="parent">Parent</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="search">
                <Input placeholder="Search" />
              </Form.Item>
            </div>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(false) ||
                    form.getFieldsError().filter(({ errors }) => errors.length)
                      .length > 0
                  }
                >
                  Search
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
          <Button type="primary" onClick={handleExportExcel}>
            Export to Excel
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
              handleAddNewCategory();
            }}
          >
            Add new
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={categories.rows.map((item: category) => {
              return {
                ...item,
                key: item.id,
              };
            })}
            loading={isLoading}
            columns={columns}
            pagination={false}
            expandable={{ showExpandColumn: false }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TableCategory;
