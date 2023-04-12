import { Spin } from 'antd';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 10,
      }}
    >
      <Spin />
    </div>
  );
};

export default Loading;
