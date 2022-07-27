import 'antd/dist/antd.css';
import React, { useState } from 'react';

import styles from './__tableUser.module.scss';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from 'antd';

import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { typeUser } from '../../../../types/user';
import ModalUser from '../ModalUser';

const cx = classNames.bind(styles);

const TableUser: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
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
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createAt',
      render: (text: string, record: typeUser) => {
        let date = new Date(record.createdAt).toLocaleDateString('vi-VN');

        return <React.Fragment>{date}</React.Fragment>;
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => {
        return (
          <Space size="middle">
            <EditOutlined className={cx('icon-edit')} />
            <Popconfirm
              placement="topLeft"
              title={`Are you sure to delete user ?`}
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

  const users: typeUser[] = useSelector((state: any) => state.user.users.data);

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
    setVisible(true);
  };
  return (
    <React.Fragment>
      <ModalUser visible={visible} setVisible={setVisible} />
      <Row className={cx('row-cus')}>
        <Col xl={18} style={{ paddingInline: '5px', flex: '1 1 auto' }}>
          <Form
            initialValues={{ remember: true, fullname: 'Fullname' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={cx('form-cus')}
          >
            <div style={{ display: 'flex' }}>
              <Form.Item
                name="fullname"
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
            columns={columns}
            pagination={false}
          />
        </Col>
      </Row>
      <Row className={cx('pagination-cus')}>
        <Pagination />
      </Row>
    </React.Fragment>
  );
};

export default TableUser;
