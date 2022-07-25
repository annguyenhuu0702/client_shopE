import React, { useState } from 'react';
import styles from './__user.module.scss';

import classNames from 'classnames/bind';
import HeaderTitle from '../../components/HeaderTitle';
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Table,
} from 'antd';

const cx = classNames.bind(styles);
const { Content } = Layout;

const User: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
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
      title: 'Created',
      dataIndex: 'create',
      key: 'create',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  return (
    <section className={cx('user')}>
      <HeaderTitle title="User" />
      <Content>
        <div className={cx('content-wrap')}>
          <div className={cx('content')}>
            <Row className={cx('row-cus')}>
              <Col xl={18} style={{ paddingInline: '5px', flex: '1 1 auto' }}>
                <Form
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className={cx('form-cus')}
                >
                  <div style={{ display: 'flex' }}>
                    <Form.Item
                      name="select-search"
                      style={{
                        paddingRight: '10px',
                      }}
                    >
                      <Select
                        style={{ width: 120, borderRadius: '5px' }}
                        onChange={handleChange}
                        placeholder="Choose"
                      >
                        <Select.Option value="full_name">
                          Fullname
                        </Select.Option>
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
                <Button type="primary">Export to execl</Button>
              </Col>
              <Col
                xl={2}
                style={{
                  textAlign: 'center',
                }}
              >
                <Button type="primary">Add new</Button>
              </Col>
            </Row>
            <Row className={cx('content-table')}>
              <Col xl={24} md={24} xs={24}>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />
              </Col>
            </Row>
            <Row className={cx('pagination-cus')}>
              <Pagination />
            </Row>
          </div>
        </div>
      </Content>
    </section>
  );
};

export default User;