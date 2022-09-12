import React from 'react';
import HeaderTop from './HeaderTop';
import { Affix } from 'antd';

const Header: React.FC = () => {
  return (
    <Affix offsetTop={0}>
      <header style={{ background: '#12283e' }}>
        <div className="p-50">
          <div className="header-container">
            <HeaderTop />
          </div>
        </div>
      </header>
    </Affix>
  );
};

export default Header;
