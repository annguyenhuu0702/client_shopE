import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Table, Typography } from 'antd';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { utils, writeFileXLSX } from 'xlsx';
import { productVariantApi } from '../../../../apis/productVariant';
import {
  productVariantActions,
  productVariantSelector,
} from '../../../../redux/slice/productVariantSlice';
import { IProductVariant } from '../../../../types/productVariant';

const { Text } = Typography;

const TableInventory: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { productVariants, isLoading, page, pageSize } = useSelector(
    productVariantSelector
  );
  const columns = [
    {
      title: 'Mã sản phẩm',
      width: 150,
      align: 'center' as AlignType,
      render: (text: string, record: IProductVariant) => {
        return <Text mark>{record?.product?.code}</Text>;
      },
    },
    {
      title: 'Tên sản phẩm',
      align: 'center' as AlignType,
      render: (text: string, record: IProductVariant) => {
        return <span>{record?.product?.name}</span>;
      },
    },
    {
      title: 'Kích thước',
      width: 150,
      align: 'center' as AlignType,
      render: (text: string, record: IProductVariant) => {
        return (
          <span>
            {record?.variantValues?.find((item) => item?.variantId === 1)?.name}
          </span>
        );
      },
    },
    {
      title: 'Màu sắc',
      width: 150,
      align: 'center' as AlignType,
      render: (text: string, record: IProductVariant) => {
        return (
          <span>
            {record?.variantValues?.find((item) => item?.variantId === 2)?.name}
          </span>
        );
      },
    },
    {
      title: 'Số lượng tồn',
      dataIndex: 'inventory',
      width: 150,
      align: 'center' as AlignType,
      render: (text: string, record: IProductVariant) => {
        return <span className="font-bold">{record?.inventory}</span>;
      },
    },
    {
      title: 'Ngày tạo',
      align: 'center' as AlignType,
      render: (text: string, record: IProductVariant) => {
        let date = moment(record?.createdAt).format('MM/DD/YYYY');
        return <div>{date}</div>;
      },
    },
  ];

  const onFinish = (values: any) => {
    console.log(values.search);
    dispatch(
      productVariantActions.getAllProductVariant({
        p: page,
        limit: pageSize,
        [values.option]: values.search,
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleExportExcel = () => {
    try {
      const getAllProductVariant = async () => {
        const data = await productVariantApi.getAll();
        let wb = utils.book_new();
        let ws = utils.json_to_sheet(
          data.data.data.rows.map((item: IProductVariant) => ({
            code: item.product.code,
            name: item.product.name,
            createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
          }))
        );
        utils.book_append_sheet(wb, ws, 'Inventory');
        writeFileXLSX(wb, 'Inventory.xlsx');
      };
      getAllProductVariant();
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
                  <Select.Option value="code">Mã sản phẩm</Select.Option>
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
        <Col xl={2} style={{ textAlign: 'right' }}>
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
            dataSource={productVariants.rows.map((item: IProductVariant) => {
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

export default TableInventory;
