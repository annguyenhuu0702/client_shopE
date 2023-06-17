import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { utils, writeFileXLSX } from 'xlsx';
import { userApi } from '../../../../apis/userApi';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  couponActions,
  couponSelector,
} from '../../../../redux/slice/couponSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import { userActions } from '../../../../redux/slice/userSlice';
import { TCoupon } from '../../../../types/coupon';
import { IUser } from '../../../../types/user';
import ModalCoupon from '../ModalCoupon/ModalCoupon';

const TableCoupon: React.FC = () => {
  const dispatch = useDispatch();

  const { isModal } = useSelector(modalSelector);
  const { coupon, isLoading, page, pageSize } = useSelector(couponSelector);
  const { user } = useSelector(authSelector);

  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Tên',
      render: (text: string, record: TCoupon) => {
        return (
          <div>
            <span
              className="text-blue-600 hover:text-blue-400"
              // onClick={() => {
              //   handleEditPromotion(record);
              // }}
            >
              {record?.name}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Loại',
      render: (text: string, record: TCoupon) => {
        return (
          <div>
            <span>{record?.name}</span>
          </div>
        );
      },
    },
    {
      title: 'Mô tả',
      render: (text: string, record: TCoupon) => {
        return (
          <div>
            <span>{record?.description}</span>
          </div>
        );
      },
    },
    {
      title: 'Phần trăm',
      render: (text: string, record: TCoupon) => {
        return (
          <div>
            <span>{record.type === 'freeship' ? 100 : record?.percent}%</span>
          </div>
        );
      },
    },
    {
      title: 'Ngày bắt đầu',
      render: (text: string, record: TCoupon) => {
        let date = moment(record?.startday).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Ngày kết thúc',
      render: (text: string, record: TCoupon) => {
        let date = moment(record?.endday).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },

    // {
    //   title: 'Hành động',
    //   render: (text: string, record: Discount) => {
    //     return (
    //       <Space size="middle">
    //         {/* <EditOutlined
    //           className="common-icon-edit"
    //           onClick={() => {
    //             handleEditPromotion(record);
    //           }}
    //         /> */}
    //         <Popconfirm
    //           placement="topRight"
    //           title={`Bạn có muốn xóa??`}
    //           onConfirm={() => {
    //             confirm(record);
    //           }}
    //           okText="Có"
    //           cancelText="Không"
    //           disabled={
    //             date > moment(record?.endday).format('MM/DD/YYYY')
    //               ? false
    //               : true
    //           }
    //         >
    //           {date > moment(record?.endday).format('MM/DD/YYYY') ? (
    //             <DeleteOutlined className="common-icon-delete" />
    //           ) : (
    //             <Tooltip
    //               placement="topLeft"
    //               title="Sản phẩm đang trong chương trình khuyến mãi nên bạn không thể xóa"
    //             >
    //               <DeleteOutlined className="common-icon-delete" />
    //             </Tooltip>
    //           )}
    //         </Popconfirm>
    //       </Space>
    //     );
    //   },
    // },
  ];

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

  const handleAddNewCoupon = () => {
    dispatch(couponActions.setCoupon(null));
    dispatch(modalActions.showModal('Thêm khuyến mãi'));
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
      {isModal && <ModalCoupon />}
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
            {/* <div style={{ display: 'flex' }}>
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
            </div> */}
            {/* <Form.Item shouldUpdate>
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
            </Form.Item> */}
          </Form>
        </Col>
        <div className="mb-4 flex justify-end w-full">
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
                handleAddNewCoupon();
              }}
            >
              Thêm mới
            </Button>
          </Col>
        </div>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={
              coupon &&
              coupon.rows.map((item: TCoupon) => {
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

export default TableCoupon;
