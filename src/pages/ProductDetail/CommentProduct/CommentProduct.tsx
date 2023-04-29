import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { commentSelector } from '../../../redux/slice/commentSlice';
import { Comment } from '../../../types/comment';
import moment from 'moment';

const CommentProduct: React.FC = () => {
  const { commentsClient } = useSelector(commentSelector);

  return (
    <Row className="py-10">
      <Col xl={12} className="border border-red-500">
        <div className="uppercase text-4xl font-semibold">Đánh giá</div>
        <div className="flex flex-col gap-8 mt-6">
          {commentsClient &&
            commentsClient.rows.map((comment: Comment) => {
              return (
                <div>
                  <div className="flex gap-4 mb-4">
                    <span>
                      <img
                        src="https://newproductreviews.sapoapps.vn//Thumbnail/Medium/Upload/ReviewImage/2022/10/24/c0321ae5173d50240a6a90088c3fdb5d.jpg"
                        alt=""
                        className="w-14 h-14 rounded-full"
                      />
                    </span>
                    <span className="text-[#212b35] font-semibold">
                      {comment.user.fullname}
                    </span>
                    <span className="text-[#212b35] font-semibold">
                      {moment(comment.createdAt).format('MM/DD/YYYY')}
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold">
                      {comment.content}
                    </span>
                  </div>
                </div>
              );
            })}
          {/* <div>
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
          </div> */}
        </div>
      </Col>
    </Row>
  );
};

export default CommentProduct;
