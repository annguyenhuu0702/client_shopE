import React from 'react';
import Header from './Header';

const CartLayout: React.FC = ({ children }: any) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default CartLayout;
