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
import { paymentApi } from '../../../../apis/paymentApi';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import {
  paymentActions,
  paymentSelector,
} from '../../../../redux/slice/paymentSlice';
import { Payment } from '../../../../types/payment';
import { castToVND } from '../../../../utils';
import ModalOrder from '../ModalOrder/ModalOrder';

const TableOrder: React.FC = () => {
  const dispatch = useDispatch();

  const { isModal } = useSelector(modalSelector);
  const { payments, isLoading, page, pageSize } = useSelector(paymentSelector);

  const { user } = useSelector(authSelector);

  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Họ tên',
      render: (text: string, record: Payment) => {
        return (
          <div>
            <span
              className="cursor-pointer text-blue-600 hover:text-blue-400"
              onClick={() => {
                dispatch(modalActions.showModal('Sửa đơn hàng'));
                dispatch(paymentActions.setPayment(record));
              }}
            >
              {record?.fullname}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Số điện thoại',
      render: (text: string, record: Payment) => {
        return (
          <div>
            <span>{record?.phone}</span>
          </div>
        );
      },
    },
    {
      title: 'Phí vận chuyển',
      render: (text: string, record: Payment) => {
        return (
          <div>
            <span>{castToVND(record?.shippingCost)}</span>
          </div>
        );
      },
    },
    {
      title: 'Tổng tiền',
      render: (text: string, record: Payment) => {
        return (
          <div>
            <span>{castToVND(record?.totalPrice)}</span>
          </div>
        );
      },
    },
    {
      title: 'Hình thức thanh toán',
      render: (text: string, record: Payment) => {
        return (
          <div>
            {record?.payment === 1 ? (
              <Tag color="blue" className="border-0 text-xl">
                Thanh toán tiền mặt
              </Tag>
            ) : (
              <Tag color="cyan" className="border-0 text-xl">
                Thanh toán qua cổng điện tử
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      render: (text: string, record: Payment) => {
        return (
          <div>
            <Tag
              color={`${record?.status === 'Chờ xử lí' ? 'red' : ''} ${
                record?.status === 'Đã xác nhận' ? 'blue' : ''
              } ${record?.status === 'Đang giao hàng' ? 'orange' : ''} ${
                record?.status === 'Đã giao hàng' ? 'green' : ''
              }`}
              className="border-0 text-xl"
            >
              {record?.status}
            </Tag>
          </div>
        );
      },
    },
    {
      title: 'Thanh toán',
      render: (text: string, record: Payment) => {
        return (
          <div>
            {record?.isPaid ? (
              <Tag color="blue" className="border-0 text-xl">
                Đã thanh toán
              </Tag>
            ) : (
              <Tag color="red" className="border-0 text-xl">
                Chưa thanh toán
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (text: string, record: Payment) => {
        let date = moment(record?.createdAt).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string, record: Payment) => {
        return (
          <Space size="middle">
            {record.status !== 'Đã giao hàng' && (
              <EditOutlined
                className="common-icon-edit"
                onClick={() => {
                  handleEditPayment(record);
                }}
              />
            )}
            {record.status === 'Đã giao hàng' && (
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
            )}
          </Space>
        );
      },
    },
  ];

  const handleEditPayment = (record: Payment) => {
    dispatch(paymentActions.setPayment(record));
    dispatch(modalActions.showModal('Sửa đơn hàng'));
  };

  const onFinish = (values: any) => {
    dispatch(
      paymentActions.getAllPayment({
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
      paymentActions.deletePayment({
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

  const handleExportExcel = () => {
    try {
      const getAllPayment = async () => {
        const data = await paymentApi.getAll(user.accessToken, dispatch);
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: Payment) => ({
            fullname: item.fullname,
            phone: item.phone,
            shippingCost: item.shippingCost,
            totalPrice: item.totalPrice,
            status: item.status,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'Order');
        writeFileXLSX(wb, 'Order.xlsx');
      };
      getAllPayment();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {isModal && <ModalOrder />}
      <Row className="common-row-cus">
        <Col xl={22} style={{ paddingInline: '5px' }}>
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
          xl={2}
          style={{
            textAlign: 'right',
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
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={
              payments &&
              payments.rows.map((item: Payment) => {
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

export default TableOrder;
