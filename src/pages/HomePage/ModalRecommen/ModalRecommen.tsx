import { Checkbox, Col, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { productApi } from '../../../apis/productApi';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { authSelector } from '../../../redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../../../apis/userApi';

interface IProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const ModalRecommen: React.FC<IProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const { user } = useSelector(authSelector);

  const dispatch = useDispatch();

  const [data, setData] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const [productCategoryId, setProductCategoryId] = useState<any>([]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setProductCategoryId(checkedValues);
  };

  const onFinish = async () => {
    if (user && user.user) {
      const res = await userApi.updateSuggestion(user?.accessToken, dispatch, {
        id: user.user?.id,
        suggestion: productCategoryId,
      });
      const { status } = res;
      if (status === 200) {
        window.location.href = '';
        handleOk?.();
      }
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await productApi.getAllProductCategoryId();
        const { data, status } = res;
        if (status === 200) {
          setData(data.data.rows);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Modal
      title="Bạn đang quan tâm?"
      open={isModalOpen}
      onOk={() => {
        onFinish();
      }}
      onCancel={handleCancel}
      okText="Đồng ý"
      cancelText="Quay lại"
      centered
      maskClosable={false}
    >
      <Checkbox.Group onChange={onChange}>
        <Row className="w-full">
          {data &&
            data.map((item) => {
              return (
                <Col xl={12} key={item.id}>
                  <Checkbox value={item.id}>{item?.name}</Checkbox>
                </Col>
              );
            })}
        </Row>
      </Checkbox.Group>
    </Modal>
  );
};

export default ModalRecommen;
