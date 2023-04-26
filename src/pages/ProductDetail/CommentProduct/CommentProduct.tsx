import { Col, Row } from 'antd';
import React from 'react';

const CommentProduct: React.FC = () => {
  return (
    <Row className="py-10">
      <Col xl={12} className="border border-red-500">
        <div className="uppercase text-4xl font-semibold">Đánh giá</div>
        <div className="flex flex-col gap-8 mt-6">
          <div>
            <div className="flex gap-4">
              <span>avatar</span>
              <span>Tên người đánh giá</span>
              <span>Ngày đánh giá đánh giá</span>
            </div>
            <div>
              <span>Nội dung đánh giá</span>
            </div>
          </div>
          <div>
            <div className="flex gap-4">
              <span>avatar</span>
              <span>Tên người đánh giá</span>
              <span>Ngày đánh giá đánh giá</span>
            </div>
            <div>
              <span>Nội dung đánh giá</span>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CommentProduct;
