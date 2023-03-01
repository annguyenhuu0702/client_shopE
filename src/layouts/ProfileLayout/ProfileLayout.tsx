import React from 'react';
import Header from '../DefaultLayout/Header';
import Footer from '../DefaultLayout/Footer';
import { Col, Row } from 'antd';
import InfoUser from './Info/Info';

const ProfileLayout: React.FC = ({ children }: any) => {
  return (
    <main>
      <Header />
      <main className="px-20 bg-bg-layout-profile max-sm:px-0 max-sm:bg-white max-lg:px-0">
        <Row gutter={[16, 16]}>
          <Col xl={6} md={8} xs={24}>
            <InfoUser />
          </Col>
          <Col xl={18} md={16} xs={24}>
            {children}
          </Col>
        </Row>
      </main>
      <Footer />
    </main>
  );
};

export default ProfileLayout;
