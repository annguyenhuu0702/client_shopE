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
import { authSelector } from '../../../../redux/slice/authSlice';
import { categorySelector } from '../../../../redux/slice/categorySlice';
import { ICategory } from '../../../../types/category';
import { routes } from '../../../../config/routes';

const TableNews: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user } = useSelector(authSelector);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      render: (text: string, record: ICategory) => {
        return (
          <div>
            <span
              className="cursor-pointer text-blue-600 hover:text-blue-400"
              onClick={() => {
                handleEditNews(record);
              }}
            >
              {record.name}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Ngày tạo',
      render: (text: string, record: ICategory) => {
        let date = moment(record.createdAt).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Hành động',
      render: (text: string, record: ICategory) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="common-icon-edit"
              onClick={() => {
                handleEditNews(record);
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
    // dispatch(
    //   categoryActions.getAllCategory({
    //     p: page,
    //     limit: pageSize,
    //     [values.option]: values.search,
    //   })
    // );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function confirm(record: any) {
    // dispatch(
    //   categoryActions.deleteCategory({
    //     token: user.accessToken,
    //     dispatch,
    //     id: record.id,
    //     params: {
    //       p: page,
    //       limit: pageSize,
    //     },
    //   })
    // );
  }

  const handleAddNewNews = () => {
    // dispatch(categoryActions.setCategory(null));
    navigate(routes.createNews);
  };

  const handleEditNews = (record: any) => {
    // dispatch(categoryActions.setCategory(record));
    // navigate(`/admin/category/edit/${record.id}`);
  };

  const handleExportExcel = () => {
    // try {
    //   const getAllCategory = async () => {
    //     const data = await categoryApi.getAll();
    //     let wb = utils.book_new();
    //     let ws = utils.json_to_sheet(
    //       data.data.data.rows.map((item: ICategory) => ({
    //         name: item.name,
    //         createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
    //       }))
    //     );
    //     utils.book_append_sheet(wb, ws, 'Category');
    //     writeFileXLSX(wb, 'Category.xlsx');
    //   };
    //   getAllCategory();
    // } catch (error) {
    //   console.log(error);
    // }
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
              handleAddNewNews();
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          {/* <Table
            dataSource={categories.rows.map((item: ICategory) => {
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
          /> */}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TableNews;
