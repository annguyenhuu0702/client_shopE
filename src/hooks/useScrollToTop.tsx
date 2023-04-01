import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });
  }, [location.pathname, searchParams]);

  return null;
}

export default ScrollToTop;
