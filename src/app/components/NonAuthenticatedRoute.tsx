import { useReactiveVar } from '@apollo/client';
import { sessionIdVar } from 'app/lib/cache';
import React from 'react';
import { Navigate } from 'react-router-dom';

const NonAuthenticatedRoute = ({ Component }) => {
  const auth = useReactiveVar(sessionIdVar);

  return !auth ? <Component /> : <Navigate to="/" />;
};
export default NonAuthenticatedRoute;
