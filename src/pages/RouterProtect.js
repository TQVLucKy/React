import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

const RouterProtect = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default RouterProtect;
