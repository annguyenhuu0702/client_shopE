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
import { AlignType } from 'rc-table/lib/interface';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { utils, writeFileXLSX } from 'xlsx';
import { variantValueApi } from '../../../../apis/variantValueApi';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  modalActions,
  modalSelector,
} from '../../../../redux/slice/modalSlice';
import {
  variantValueActions,
  variantValueSelector,
} from '../../../../redux/slice/variantValueSlice';
import { IVariantValue } from '../../../../types/variantValue';
import ModalColor from '../ModalColor/ModalColor';

const TableColor: React.FC = () => {
  const dispatch = useDispatch();

  const { isModal } = useSelector(modalSelector);
  const { colors, isLoadingColor, pageColor, pageSizeColor } =
    useSelector(variantValueSelector);
  const { user } = useSelector(authSelector);

  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },

    {
      title: 'Tên',
      align: 'center' as AlignType,
      render: (text: string, record: IVariantValue) => {
        return (
          <div>
            <span
              className="cursor-pointer text-blue-600 hover:text-blue-400"
              onClick={() => {
                handleEditColor(record);
              }}
            >
              {record?.name}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Ngày tạo',
      align: 'center' as AlignType,
      render: (text: string, record: IVariantValue) => {
        let date = moment(record?.createdAt).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      align: 'center' as AlignType,
      render: (text: string, record: IVariantValue) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="common-icon-edit"
              onClick={() => {
                handleEditColor(record);
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

  const handleEditColor = (record: IVariantValue) => {
    dispatch(variantValueActions.setColor(record));
    dispatch(modalActions.showModal('Sửa màu sắc'));
  };

  const onFinish = (values: any) => {
    // dispatch(
    //   userActions.getAllUser({
    //     token: user.accessToken,
    //     dispatch,
    //     params: {
    //       p: page,
    //       limit: pageSize,
    //       [values.option]: values.search,
    //     },
    //   })
    // );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function confirm(record: any) {
    dispatch(
      variantValueActions.deleteColor({
        token: user.accessToken,
        dispatch,
        id: record.id,
        params: {
          p: pageColor,
          limit: pageSizeColor,
        },
      })
    );
  }

  const handleAddNewColor = () => {
    dispatch(variantValueActions.setColor(null));
    dispatch(modalActions.showModal('Thêm màu sắc'));
  };

  const handleExportExcel = () => {
    try {
      const getAllColor = async () => {
        const data = await variantValueApi.getAllColor(
          user.accessToken,
          dispatch
        );
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: IVariantValue) => ({
            name: item.name,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'Color');
        writeFileXLSX(wb, 'Color.xlsx');
      };
      getAllColor();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {isModal && <ModalColor />}
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
              handleAddNewColor();
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
              colors &&
              colors.rows.map((item: IVariantValue) => {
                return {
                  ...item,
                  key: item.id,
                };
              })
            }
            loading={isLoadingColor}
            columns={columns}
            pagination={false}
            size="small"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TableColor;
