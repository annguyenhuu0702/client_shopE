import React, { useState, useEffect } from 'react';
import HeaderMobile from './HeaderMobile/HeaderMobile';
import HeaderTop from './HeaderTop';

const Header: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 480;
  return (
    <React.Fragment>
      <header
        style={{
          background: '#12283e',
        }}
        className="max-sm:hidden"
      >
        <div className="p-50">
          <div className="header-container">
            <HeaderTop />
          </div>
        </div>
      </header>
      {isMobile && <HeaderMobile />}
    </React.Fragment>
  );
};

export default Header;
