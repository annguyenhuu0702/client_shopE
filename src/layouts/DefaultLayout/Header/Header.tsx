import React from 'react';
import HeaderMobile from './HeaderMobile/HeaderMobile';
import HeaderTop from './HeaderTop';

const Header: React.FC = () => {
  return (
    <main>
      <header style={{ background: '#12283e' }} className="max-sm:hidden">
        <div className="p-50">
          <div className="header-container">
            <HeaderTop />
          </div>
        </div>
      </header>
      <HeaderMobile />
    </main>
  );
};

export default Header;
