import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';

const GuestMiddleware = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  if (authenticated) {
    return <Navigate to={'/dashboard'} />;
  }

  return <>{children}</>;
};

export default GuestMiddleware;
