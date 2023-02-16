import React from 'react';
import HeaderTop from './HeaderTop';
import { Affix } from 'antd';

const Header: React.FC = () => {
  return (
    // <Affix offsetTop={0}>
    <main>
      <header style={{ background: '#12283e' }} className="max-sm:hidden">
        <div className="p-50">
          <div className="header-container">
            <HeaderTop />
          </div>
        </div>
      </header>
      <div className="hidden max-sm:block">
        <div>a</div>
      </div>
    </main>
    // </Affix>
  );
};

export default Header;
