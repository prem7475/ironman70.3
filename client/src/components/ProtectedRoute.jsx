import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

const ProtectedRoute = ({ children }) => {
  const user = useStore(state => state.user);
  const location = useLocation();
  if (!user || !localStorage.getItem('paceforge_token')) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return children;
};

export default ProtectedRoute;