import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../../../components/Product';
import { routes } from '../../../config/routes';
import { useTitle } from '../../../hooks/useTitle';
import { authSelector } from '../../../redux/slice/authSlice';
import {
  favoriteProductActions,
  favoriteProductSelector,
} from '../../../redux/slice/favoriteProductSlice';

const FavoriteProduct: React.FC = () => {
  const { user } = useSelector(authSelector);
  const { products } = useSelector(favoriteProductSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      favoriteProductActions.getFavoriteProductByUser({
        token: user.accessToken,
        dispatch,
      })
    );
  }, [dispatch, user.accessToken]);
  useTitle('Sản phẩm yêu thích');
  return (
    <section className="pl-12 pb-36 max-sm:px-4 max-sm:pb-12 max-lg:px-8 max-lg:pb-12">
      <h3 className="mb-8 pt-8 text-4xl">Sản phẩm yêu thích</h3>
      {products.rows.length === 0 && (
        <p className="text-3xl">
          Bạn chưa có sản phẩm yêu thích! Vui lòng ấn&nbsp;
          <b>
            <Link to={routes.home}>vào đây</Link>
          </b>
          &nbsp;để xem thêm sản phẩm
        </p>
      )}
      <Row gutter={[16, 16]}>
        {products.rows.map((product) => {
          return (
            <Col xl={8} md={12} xs={12} key={product.id}>
              <Product product={product.product} />
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default FavoriteProduct;
