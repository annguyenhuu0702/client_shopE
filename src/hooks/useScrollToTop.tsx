import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });
  }, [location.pathname]);

  return null;
}

export default ScrollToTop;
