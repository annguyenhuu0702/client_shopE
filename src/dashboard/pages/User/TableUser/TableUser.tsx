import 'antd/dist/antd.css';
import React from 'react';

import styles from './__tableUser.module.scss';

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

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../../redux/slice/modalSlice';
import { userActions } from '../../../../redux/slice/userSlice';
import { typeUser } from '../../../../types/user';
import ModalUser from '../ModalUser';

const cx = classNames.bind(styles);

const TableUser: React.FC = () => {
  const dispatch = useDispatch();

  const isModal: boolean = useSelector((state: any) => state.modal.isModal);

  const users: typeUser[] = useSelector((state: any) => state.user.users?.rows);
  const isLoading: boolean = useSelector((state: any) => state.user.isLoading);

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: string, record: typeUser) => {
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
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (text: string, record: typeUser) => {
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
      key: 'createAt',
      render: (text: string, record: typeUser) => {
        let date = new Date(record.createdAt).toLocaleDateString('en-EN');

        return <React.Fragment>{date}</React.Fragment>;
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: typeUser) => {
        return (
          <Space size="middle">
            <EditOutlined
              className={cx('icon-edit')}
              onClick={() => {
                handleEditUser(record);
              }}
            />
            <Popconfirm
              placement="topLeft"
              title={`Do you want to delete this?`}
              onConfirm={() => {
                confirm();
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className={cx('icon-delete')} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleEditUser = (record: typeUser) => {
    dispatch(modalActions.showModal('Edit user'));
    dispatch(userActions.setUser(record));
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  function confirm() {
    console.log('hello');
  }

  const handleAddNewUser = () => {
    dispatch(modalActions.showModal('Add user'));
    dispatch(userActions.setUser(null));
  };
  return (
    <React.Fragment>
      {isModal && <ModalUser />}
      <Row className={cx('row-cus')}>
        <Col xl={18} style={{ paddingInline: '5px' }}>
          <Form
            initialValues={{ select: 'Fullname', search: '' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={cx('form-cus')}
          >
            <div style={{ display: 'flex' }}>
              <Form.Item
                name="select"
                style={{
                  paddingRight: '10px',
                }}
              >
                <Select
                  style={{ width: 120, borderRadius: '5px' }}
                  onChange={handleChange}
                >
                  <Select.Option value="fullname">Fullname</Select.Option>
                  <Select.Option value="email">Email</Select.Option>
                  <Select.Option value="phone">Phone</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="search">
                <Input placeholder="Search" />
              </Form.Item>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col
          xl={4}
          style={{
            textAlign: 'center',
          }}
        >
          <Button type="primary">Export to Excel</Button>
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
      <Row className={cx('content-table')}>
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={
              users &&
              users.map((item: typeUser) => {
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
