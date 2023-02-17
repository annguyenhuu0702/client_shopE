import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = ({ children }: any) => {
  return (
    <section style={{ display: 'flex' }}>
      <Sidebar />
      {children}
    </section>
  );
};

export default DashboardLayout;
