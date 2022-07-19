import React from 'react';
import Footer from './Footer';
import Header from './Header';

const DefaultLayout = ({ children }: any) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default DefaultLayout;
