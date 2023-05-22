import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { AlignType } from 'rc-table/lib/interface';

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
  Tooltip,
} from 'antd';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import ModalPromotion from '../ModalPromotion/ModalPromotion';
import {
  discountActions,
  discountSelector,
} from '../../../../redux/slice/discountSlice';
import { Discount } from '../../../../types/discount';
import moment from 'moment';
import { authSelector } from '../../../../redux/slice/authSlice';
import { discountApi } from '../../../../apis/discount';
import { utils, writeFileXLSX } from 'xlsx';

const TablePromotion: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user } = useSelector(authSelector);
  const { isModal } = useSelector(modalSelector);
  const { discount, isLoading, page, pageSize } = useSelector(discountSelector);

  let date = moment(Date.now()).format('MM/DD/YYYY');

  const onFinish = (values: any) => {
    dispatch(
      discountActions.getAllDiscount({
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
      discountActions.deleteDiscount({
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

  const handleAddNewPromotion = () => {
    dispatch(discountActions.setDiscount(null));
    dispatch(modalActions.showModal('Thêm chương trình khuyến mãi'));
  };

  // const handleEditPromotion = (record: any) => {
  //   dispatch(discountActions.setDiscount(record));
  //   dispatch(modalActions.showModal('Sửa chương trình khuyến mãi'));
  // };

  const handleExportExcel = () => {
    try {
      const getAllPromotion = async () => {
        const data = await discountApi.getAll(user.accessToken, dispatch);
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: Discount) => ({
            name: item.name,
            start_day: item.startday,
            end_day: item.endday,
            percent: item.percent,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'Discount');
        writeFileXLSX(wb, 'Discount.xlsx');
      };
      getAllPromotion();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },

    {
      title: 'Tên',
      render: (text: string, record: Discount) => {
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
      title: 'Danh mục sản phẩm',
      render: (text: string, record: Discount) => {
        return (
          <Space size={[0, 8]} wrap>
            {record?.productCategories?.map((item) => {
              return (
                <Tag color="green" key={item.id}>
                  {item.name}
                </Tag>
              );
            })}
          </Space>
        );
      },
    },
    {
      title: 'Khuyến mãi (%)',
      render: (text: string, record: Discount) => {
        return <div>{record?.percent}</div>;
      },
      align: 'center' as AlignType,
    },
    {
      title: 'Ngày bắt đầu',
      render: (text: string, record: Discount) => {
        let date = moment(record?.startday).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Ngày kết thúc',
      render: (text: string, record: Discount) => {
        let date = moment(record?.endday).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Trạng thái',
      render: (text: string, record: Discount) => {
        return (
          <div>
            {date > moment(record?.endday).format('MM/DD/YYYY') ? (
              <Tag color="red">Kết thúc</Tag>
            ) : (
              <Tag color="green">Đang chạy</Tag>
            )}
          </div>
        );
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

  return (
    <React.Fragment>
      {isModal && <ModalPromotion />}

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
        <Col xl={4} style={{ textAlign: 'center' }}>
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
              handleAddNewPromotion();
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            dataSource={discount.rows.map((item: Discount) => {
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
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TablePromotion;
