import React from 'react';
import { useTitle } from '../../hooks/useTitle';

const NotFound: React.FC = () => {
  useTitle('Not found');
  return <div>Not found!!!!!!!!!!!!!</div>;
};

export default NotFound;
