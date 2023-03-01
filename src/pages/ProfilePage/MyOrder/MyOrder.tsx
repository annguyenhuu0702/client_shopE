import React from 'react';
import { useTitle } from '../../../hooks/useTitle';

const MyOrder: React.FC = () => {
  useTitle('Đơn hàng của tôi');
  return <div>order của tôi</div>;
};

export default MyOrder;
