import { useReactiveVar } from '@apollo/client';
import { sessionIdVar, requestedRoute } from 'app/lib/cache';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
  const auth = useReactiveVar(sessionIdVar);
  if (!auth) {
    requestedRoute(window.location.pathname);
    return <Navigate to="/login" />;
  } else {
    return <Component />;
  }
};
export default PrivateRoute;
