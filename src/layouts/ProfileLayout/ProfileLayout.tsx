import React from 'react';
import Header from '../DefaultLayout/Header';
import Footer from '../DefaultLayout/Footer';
import { Col, Row } from 'antd';
import InfoUser from './Info/Info';

const ProfileLayout: React.FC = ({ children }: any) => {
  return (
    <main>
      <Header />
      <main className="px-20 bg-bg-layout-profile">
        <Row gutter={[16, 16]}>
          <Col xl={5}>
            <InfoUser />
          </Col>
          <Col xl={19}>{children}</Col>
        </Row>
      </main>
      <Footer />
    </main>
  );
};

export default ProfileLayout;
