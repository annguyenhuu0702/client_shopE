import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = ({ children }: any) => {
  return (
    <main style={{ display: 'flex' }}>
      <Sidebar />
      {children}
    </main>
  );
};

export default DashboardLayout;
