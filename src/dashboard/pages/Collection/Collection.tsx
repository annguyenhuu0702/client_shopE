import { Layout, Pagination } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks/useTitle';
import {
  collectionActions,
  collectionSelector,
  collectionState,
} from '../../../redux/slice/collectionSlice';
import HeaderTitle from '../../components/HeaderTitle';
import TableCollection from './TableCollection';

const { Content } = Layout;

const Collection: React.FC = () => {
  const dispatch = useDispatch();
  const { collections, page, pageSize }: collectionState =
    useSelector(collectionSelector);

  useEffect(() => {
    dispatch(
      collectionActions.getAllCollection({
        p: page,
        limit: 7,
      })
    );
  }, [dispatch, page]);

  useTitle('Bộ sưu tập');
  return (
    <main className="section-common">
      <HeaderTitle title="Bộ sưu tập" />
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableCollection />
          </div>
        </div>
      </Content>
      {collections.count > 0 && (
        <div className="common-pagination-cus">
          <Pagination
            pageSize={pageSize}
            current={page}
            total={collections.count}
            onChange={(page: number, pageSize: number) => {
              dispatch(collectionActions.setPage({ page, pageSize }));
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Collection;
