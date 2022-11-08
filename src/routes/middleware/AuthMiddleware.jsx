import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';

const AuthMiddleware = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to={'/'} />;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
