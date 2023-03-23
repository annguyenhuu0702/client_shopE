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
} from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { utils, writeFileXLSX } from 'xlsx';
import { collectionApi } from '../../../../apis/collectionApi';
import { routes } from '../../../../config/routes';
import { authSelector, authState } from '../../../../redux/slice/authSlice';
import {
  collectionActions,
  collectionSelector,
  collectionState,
} from '../../../../redux/slice/collectionSlice';
import { ICollection } from '../../../../types/collection';
import { removeTextBetweenParentheses } from '../../../../utils';

const TableCollection: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { collections, isLoading, page, pageSize }: collectionState =
    useSelector(collectionSelector);
  const { user }: authState = useSelector(authSelector);
  const navigate = useNavigate();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    // {
    //   title: 'Hình ảnh',
    //   width: 100,
    //   render: (text: string, record: collection) => {
    //     return record.thumbnail !== '' ? (
    //       <div className="cursor-text">
    //         <img
    //           src={record.thumbnail}
    //           alt=""
    //           className="w-20 h-14 object-cover"
    //         />
    //       </div>
    //     ) : (
    //       <></>
    //     );
    //   },
    // },
    {
      title: 'Tên',
      render: (text: string, record: ICollection) => {
        return (
          <div>
            <span
              className="cursor-pointer text-blue-600 hover:text-blue-400"
              onClick={() => {
                handleEditCollection(record);
              }}
            >
              {removeTextBetweenParentheses(record.name)}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Danh mục',
      render: (text: string, record: ICollection) => {
        return (
          <div>
            <Tag color="green" className="border-0 text-xl">
              {record.category && record.category.name}
            </Tag>
          </div>
        );
      },
    },
    {
      title: 'Ngày tạo',
      render: (text: string, record: ICollection) => {
        let date = moment(record.createdAt).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Hành động',
      render: (text: string, record: ICollection) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="common-icon-edit"
              onClick={() => {
                handleEditCollection(record);
              }}
            />
            <Popconfirm
              placement="topRight"
              title={`Bạn có muốn xóa??`}
              onConfirm={() => {
                confirm(record);
              }}
              okText="Có"
              cancelText="Không"
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
      collectionActions.getAllCollection({
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
      collectionActions.deleteCollection({
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

  const handleAddNewCollection = () => {
    dispatch(collectionActions.setCollection(null));
    navigate(routes.createCollectionAdmin);
  };

  const handleEditCollection = (record: any) => {
    dispatch(collectionActions.setCollection(record));
    navigate(`/admin/collection/edit/${record.id}`);
  };

  const handleExportExcel = () => {
    try {
      const getAllCollection = async () => {
        const data = await collectionApi.getAll();
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: ICollection) => ({
            name: item.name,
            category: item.category.name,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'Collection');
        writeFileXLSX(wb, 'Collection.xlsx');
      };
      getAllCollection();
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
              handleAddNewCollection();
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={collections.rows.map((item: ICollection) => {
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

export default TableCollection;
