import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../redux/slice/authSlice';
import {
  commentActions,
  commentSelector,
} from '../../../redux/slice/commentSlice';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import { Content } from 'antd/es/layout/layout';
import { Pagination } from 'antd';
import { useTitle } from '../../../hooks/useTitle';
import TableComment from './TableComment/TableComment';

const Comment: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  const { comments, page, pageSize } = useSelector(commentSelector);

  useEffect(() => {
    dispatch(
      commentActions.getAllComment({
        token: user.accessToken,
        dispatch,
      })
    );
  }, [dispatch, user.accessToken]);

  useTitle('Bình luận');

  return (
    <main className="section-common">
      <HeaderTitle title="Bình luận" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableComment />
          </div>
        </div>
      </Content>
      {comments.count > 12 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={comments.count}
            showSizeChanger={false}
            onChange={(page: number, pageSize: number) => {
              dispatch(commentActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Comment;
