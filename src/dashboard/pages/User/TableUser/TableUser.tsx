import 'antd/dist/antd.css';
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

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { utils, writeFileXLSX } from 'xlsx';
import { userApi } from '../../../../apis/userApi';
import {
  modalActions,
  modalSelector,
  modalState,
} from '../../../../redux/slice/modalSlice';
import {
  userState,
  userActions,
  userSelector,
} from '../../../../redux/slice/userSlice';
import { user } from '../../../../types/user';
import ModalUser from '../ModalUser';
import { authSelector, authState } from '../../../../redux/slice/authSlice';

const TableUser: React.FC = () => {
  const dispatch = useDispatch();

  const { isModal }: modalState = useSelector(modalSelector);
  const { users, isLoading, page, pageSize }: userState =
    useSelector(userSelector);
  const { user }: authState = useSelector(authSelector);

  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (text: string, record: user) => {
        return (
          <React.Fragment>
            {record.avatar === '' ? (
              <img
                style={{
                  width: '30px',
                  height: '30px',
                }}
                src="https://res.cloudinary.com/diot4imoq/image/upload/v1659164349/supersports/1200px-Breezeicons-actions-22-im-user.svg_ophigj.png"
                alt=""
              />
            ) : (
              <img src={record.avatar} alt="" />
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: 'FullName',
      dataIndex: 'fullname',
      sorter: (a: user, b: user) => {
        return a.fullname.localeCompare(b.fullname);
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      render: (text: string, record: user) => {
        return (
          <React.Fragment>
            {record.gender === true ? <span>Male</span> : <span>Female</span>}
          </React.Fragment>
        );
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      render: (text: string, record: user) => {
        let date = new Date(record.createdAt).toLocaleDateString('en-EN');
        return <React.Fragment>{date}</React.Fragment>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: string, record: user) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="common-icon-edit"
              onClick={() => {
                handleEditUser(record);
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

  const handleEditUser = (record: user) => {
    dispatch(modalActions.showModal('Edit user'));
    dispatch(userActions.setUser(record));
  };

  const onFinish = (values: any) => {
    dispatch(
      userActions.getAllUser({
        token: user.accessToken,
        dispatch,
        params: {
          p: page,
          limit: pageSize,
          [values.option]: values.search,
        },
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function confirm(record: any) {
    dispatch(
      userActions.deleteUser({
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

  const handleAddNewUser = () => {
    dispatch(modalActions.showModal('Add user'));
    dispatch(userActions.setUser(null));
  };

  const handleExportExcel = () => {
    try {
      const getAllUser = async () => {
        const data = await userApi.getAll(user.accessToken, dispatch);
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: user) => ({
            fullname: item.fullname,
            email: item.email,
            phone: item.phone,
            city: item.city,
            birthday: item.birthday,
            gender: item.gender === true ? 'Nam' : 'Nữ',
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'User');
        writeFileXLSX(wb, 'User.xlsx');
      };
      getAllUser();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {isModal && <ModalUser />}
      <Row className="common-row-cus">
        <Col xl={18} style={{ paddingInline: '5px' }}>
          <Form
            form={form}
            initialValues={{ option: 'fullname', search: '' }}
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
                  <Select.Option value="fullname">Fullname</Select.Option>
                  <Select.Option value="email">Email</Select.Option>
                  <Select.Option value="phone">Phone</Select.Option>
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
              handleAddNewUser();
            }}
          >
            Add new
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={
              users &&
              users.rows.map((item: user) => {
                return {
                  ...item,
                  key: item.id,
                };
              })
            }
            loading={isLoading}
            columns={columns}
            pagination={false}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TableUser;
