import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
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
import { commentApi } from '../../../../apis/commentApi';
import { authSelector } from '../../../../redux/slice/authSlice';
import {
  commentActions,
  commentSelector,
} from '../../../../redux/slice/commentSlice';
import { modalActions } from '../../../../redux/slice/modalSlice';
import { Comment } from '../../../../types/comment';
import { Payment } from '../../../../types/payment';
import { castToVND } from '../../../../utils';

const TableComment: React.FC = () => {
  const dispatch = useDispatch();

  const { comments, isLoading, page, pageSize } = useSelector(commentSelector);

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
      render: (text: string, record: Comment) => {
        return (
          <div>
            <span
              className="cursor-pointer text-blue-600 hover:text-blue-400"
              onClick={() => {
                dispatch(modalActions.showModal('Sửa đơn hàng'));
                dispatch(commentActions.setComment(record));
              }}
            >
              {record?.user?.fullname}
            </span>
          </div>
        );
      },
    },

    {
      title: 'Nội dung',
      render: (text: string, record: Comment) => {
        return (
          <div>
            <span>{castToVND(record?.content)}</span>
          </div>
        );
      },
    },
    {
      title: 'Số sao',
      dataIndex: 'rating',
      align: 'center' as AlignType,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (text: string, record: Comment) => {
        let date = moment(record?.createdAt).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      width: 100,
      align: 'center' as AlignType,
      render: (text: string, record: Comment) => {
        return (
          <Space size="middle">
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

  const onFinish = (values: any) => {
    dispatch(
      commentActions.getAllComment({
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
      commentActions.deleteComment({
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
      const getAllComment = async () => {
        const data = await commentApi.getAllComment(user.accessToken, dispatch);
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: Comment) => ({
            fullname: item.user.fullname,
            content: item.content,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'Comment');
        writeFileXLSX(wb, 'Comment.xlsx');
      };
      getAllComment();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
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
              comments &&
              comments.rows.map((item: Payment) => {
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

export default TableComment;
