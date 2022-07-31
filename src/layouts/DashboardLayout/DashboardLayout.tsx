import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = ({ children }: any) => {
  return (
    <div style={{ display: 'flex', overflow: 'hidden' }}>
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
