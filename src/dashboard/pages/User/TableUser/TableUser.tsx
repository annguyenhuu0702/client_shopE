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
import { AlignType } from 'rc-table/lib/interface';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { utils, writeFileXLSX } from 'xlsx';
import { userApi } from '../../../../apis/userApi';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import { userActions, userSelector } from '../../../../redux/slice/userSlice';
import { IUser } from '../../../../types/user';
import ModalUser from '../ModalUser';

const TableUser: React.FC = () => {
  const dispatch = useDispatch();

  const { isModal } = useSelector(modalSelector);
  const { users, isLoading, page, pageSize } = useSelector(userSelector);
  const { user } = useSelector(authSelector);

  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'avatar',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string, record: IUser) => {
        return (
          <React.Fragment>
            {!record?.avatar ? (
              <img
                className="w-20 h-14 object-cover"
                src="https://res.cloudinary.com/diot4imoq/image/upload/v1677655323/canifa/user_jmlojj.jpg"
                alt=""
              />
            ) : (
              <img
                className="w-20 h-14 object-cover"
                src={record?.avatar}
                alt=""
              />
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullname',
      render: (text: string, record: IUser) => {
        return (
          <div>
            <span
              className="cursor-pointer text-blue-600 hover:text-blue-400"
              onClick={() => {
                handleEditUser(record);
              }}
            >
              {record?.fullname}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string, record: IUser) => {
        return (
          <div>
            {record?.gender === true ? (
              <Tag color="red" className="border-0 text-xl">
                Nam
              </Tag>
            ) : (
              <Tag color="green" className="border-0 text-xl">
                Nữ
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'Điểm tích lũy',
      dataIndex: 'accumulatedPoints',
      align: 'center' as AlignType,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (text: string, record: IUser) => {
        let date = moment(record?.createdAt).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string, record: IUser) => {
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

  const handleEditUser = (record: IUser) => {
    dispatch(userActions.setUser(record));
    dispatch(modalActions.showModal('Sửa khách hàng'));
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
    dispatch(userActions.setUser(null));
    dispatch(modalActions.showModal('Thêm khách hàng'));
  };

  const handleExportExcel = () => {
    try {
      const getAllUser = async () => {
        const data = await userApi.getAll(user.accessToken, dispatch);
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: IUser) => ({
            fullname: item.fullname,
            email: item.email,
            phone: item.phone,
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
                  <Select.Option value="fullname">Họ tên</Select.Option>
                  <Select.Option value="email">Email</Select.Option>
                  <Select.Option value="phone">SĐT</Select.Option>
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
              handleAddNewUser();
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={
              users &&
              users.rows.map((item: IUser) => {
                return {
                  ...item,
                  key: item.id,
                };
              })
            }
            loading={isLoading}
            columns={columns}
            pagination={false}
            size="small"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TableUser;
