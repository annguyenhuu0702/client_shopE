import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from '../../../components/Product';
import { productSelector } from '../../../redux/slice/productSlice';

const ProductRelated: React.FC = () => {
  const { productsRelatedClient } = useSelector(productSelector);
  const { slug } = useParams();

  return (
    <div className="mt-16">
      <h3 className="mb-8 text-4xl font-semibold">Có thể bạn sẽ thích</h3>
      <Row gutter={[16, 16]}>
        {productsRelatedClient &&
          productsRelatedClient
            .filter((product) => product.slug !== slug)
            .map((item) => {
              return (
                <Col xl={6} md={8} xs={12} key={item.id}>
                  <Product product={item} />
                </Col>
              );
            })}
      </Row>
    </div>
  );
};

export default ProductRelated;
