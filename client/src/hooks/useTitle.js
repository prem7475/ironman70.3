import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_TITLES, CATEGORY_TITLES } from '../constants';

const useTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const categoryMatch = location.pathname.match(/^\/races\/([^/]+)$/);
    const title = PAGE_TITLES[location.pathname] ||
      (categoryMatch ? `PACEFORGE - ${CATEGORY_TITLES[categoryMatch[1]] || categoryMatch[1].replaceAll('-', ' ')}` : 'PACEFORGE');

    document.title = title;
  }, [location.pathname]);
};

export default useTitle;
