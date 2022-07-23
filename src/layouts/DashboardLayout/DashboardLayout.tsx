import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }: any) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
