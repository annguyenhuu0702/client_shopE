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
import { utils, writeFileXLSX } from 'xlsx';

import { useDispatch, useSelector } from 'react-redux';
import { categoryTypeApi } from '../../../../apis/categoryTypeApi';
import { authSelector, authState } from '../../../../redux/slice/authSlice';
import {
  categoryTypeActions,
  categoryTypeSelector,
  categoryTypeState,
} from '../../../../redux/slice/categoryTypeSlice';
import {
  modalActions,
  modalSelector,
  modalState,
} from '../../../../redux/slice/modalSlice';
import { categoryType } from '../../../../types/categortType';
import ModalCategoryType from '../ModalCategoryType';
import moment from 'moment';

const TableCategoryType: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { isModal }: modalState = useSelector(modalSelector);
  const { user }: authState = useSelector(authSelector);

  const { categoriesType, page, isLoading }: categoryTypeState =
    useSelector(categoryTypeSelector);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: categoryType) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="common-icon-edit"
              onClick={() => {
                handleEditCategoryType(record);
              }}
            />
            <Popconfirm
              placement="topLeft"
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
      categoryTypeActions.getAllCategoryType({
        p: page,
        limit: 7,
        [values.option]: values.search,
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function confirm(record: any) {
    dispatch(
      categoryTypeActions.deleteCategoryType({
        token: user.accessToken,
        dispatch,
        id: record.id,
        p: page,
        limit: 7,
      })
    );
  }

  const handleAddNewCategoryType = () => {
    dispatch(modalActions.showModal('Add Category Type'));
    dispatch(categoryTypeActions.setCategoryType(null));
  };

  const handleEditCategoryType = (record: categoryType) => {
    dispatch(modalActions.showModal('Edit Category Type'));
    dispatch(categoryTypeActions.setCategoryType(record));
  };

  const handleExportExcel = () => {
    try {
      const getAllCategoryType = async () => {
        const data = await categoryTypeApi.getAll();
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: categoryType) => ({
            name: item.name,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'CategoryType');
        writeFileXLSX(wb, 'CategoryType.xlsx');
      };
      getAllCategoryType();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {isModal && <ModalCategoryType />}
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
              handleAddNewCategoryType();
            }}
          >
            Add new
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={categoriesType.rows.map((item: categoryType) => {
              return {
                ...item,
                key: item.id,
              };
            })}
            loading={isLoading}
            columns={columns}
            pagination={false}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TableCategoryType;
