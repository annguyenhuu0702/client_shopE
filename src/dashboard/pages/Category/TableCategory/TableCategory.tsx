import React from 'react';
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

import { useDispatch, useSelector } from 'react-redux';
import ModalCategory from '../ModalCategory';
import {
  modalActions,
  modalSelector,
  modalState,
} from '../../../../redux/slice/modalSlice';
import {
  categorySelector,
  categoryState,
} from '../../../../redux/slice/categorySlice';
import { category } from '../../../../types/category';
import moment from 'moment';

const TableCategory: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { isModal }: modalState = useSelector(modalSelector);
  const { categories, isLoading, page }: categoryState =
    useSelector(categorySelector);

  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
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

  const onFinish = (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function confirm(record: any) {}

  const handleAddNewCategory = () => {
    dispatch(modalActions.showModal('Add Category'));
  };

  const handleEditCategory = (record: any) => {};

  const handleExportExcel = () => {
    try {
      const getAllCategory = async () => {};
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {isModal && <ModalCategory />}
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
