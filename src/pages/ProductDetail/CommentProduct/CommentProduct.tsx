import { Col, Popconfirm, Row, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  commentActions,
  commentSelector,
} from '../../../redux/slice/commentSlice';
import { Comment } from '../../../types/comment';
import moment from 'moment';
import { authSelector } from '../../../redux/slice/authSlice';
import { productSelector } from '../../../redux/slice/productSlice';
import { modalActions, modalSelector } from '../../../redux/slice/modalSlice';
import ModalComment from '../ModalComment/ModalComment';

const CommentProduct: React.FC = () => {
  const dispatch = useDispatch();

  const { commentsClient } = useSelector(commentSelector);
  const { currentProductClient } = useSelector(productSelector);
  const { isModal } = useSelector(modalSelector);

  const { user } = useSelector(authSelector);

  const [contentComment, setContentComment] = useState<string>('');

  const handleAddComment = () => {
    if (currentProductClient) {
      const formData = {
        productId: currentProductClient.id,
        content: contentComment,
      };

      dispatch(
        commentActions.createCommentByUser({
          token: user.accessToken,
          dispatch,
          data: formData,
        })
      );
      setContentComment('');
    }
  };

  const handleEditComment = (comment: Comment) => {
    dispatch(modalActions.showModal('Sửa bình luận'));
    dispatch(commentActions.setComment(comment));
  };

  function confirm(record: any) {
    if (currentProductClient) {
      dispatch(
        commentActions.deleteCommentByUser({
          token: user.accessToken,
          dispatch,
          id: record.id,
          productId: currentProductClient.id,
        })
      );
    }
  }

  return (
    <Row className="py-10">
      {isModal && <ModalComment />}
      <Col xl={12} className="border border-red-500">
        <div className="uppercase text-4xl font-semibold">Đánh giá</div>
        {user.user && (
          <div className="my-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-solid border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                rows={5}
                className="px-0 w-full text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Nhập đánh giá của bạn"
                value={contentComment}
                onChange={(e: any) => {
                  setContentComment(e.target.value);
                }}
              ></textarea>
            </div>
            <button
              onClick={() => {
                handleAddComment();
              }}
              type="submit"
              className="inline-flex items-center py-2.5 px-4 font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 border-none outline-none cursor-pointer"
            >
              Đánh giá
            </button>
          </div>
        )}
        <div className="flex flex-col gap-8 mt-6">
          {commentsClient && commentsClient.count > 0 ? (
            commentsClient.rows.map((comment: Comment) => {
              return (
                <div
                  className="border border-solid border-gray-200 py-4 px-6 rounded-md"
                  key={comment.id}
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <span>
                        <img
                          src={
                            comment.user.avatar !== ''
                              ? comment.user.avatar
                              : 'https://res.cloudinary.com/diot4imoq/image/upload/v1677655323/canifa/user_jmlojj.jpg'
                          }
                          alt=""
                          className="w-14 h-14 rounded-full"
                        />
                      </span>
                      <span className="text-[#212b35] font-semibold">
                        {comment.user.fullname}
                      </span>
                      <span className="text-[#212b35] font-semibold text-right">
                        {moment(comment.createdAt).format('MM/DD/YYYY')}
                      </span>
                    </div>
                    {user.user?.id === comment.user.id && (
                      <div>
                        <Space size="middle">
                          <EditOutlined
                            className="common-icon-edit cursor-pointer text-blue-500"
                            onClick={() => {
                              handleEditComment(comment);
                            }}
                          />
                          <Popconfirm
                            placement="topRight"
                            title={`Bạn có muốn xóa??`}
                            onConfirm={() => {
                              confirm(comment);
                            }}
                            okText="Có"
                            cancelText="Không"
                          >
                            <DeleteOutlined className="common-icon-delete text-red-500 " />
                          </Popconfirm>
                        </Space>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-2xl font-medium">
                      {comment.content}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="my-6 border border-solid border-gray-400 rounded-md">
              <span className="flex justify-center text-3xl py-12">
                Hiện chưa có bình luận nào cho sản phẩm này!
              </span>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default CommentProduct;
