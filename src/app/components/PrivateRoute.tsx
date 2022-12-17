import { useReactiveVar } from '@apollo/client';
import {
  sessionIdVar,
  requestedRoute,
  activeWorkspaceIdVar,
} from 'app/lib/cache';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import Loader from 'app/components/Loader';
import ChooseWorkspace from 'app/components/ChooseWorkspace';

const CheckUserLoaded = ({ Component }) => {
  const activeWorkspaceId = useReactiveVar(activeWorkspaceIdVar);
  const { data, loading: userLoading, error } = useQuery(CURRENT_USER);

  if (userLoading) {
    return <Loader />;
  }

  if (!activeWorkspaceId) {
    const workspaces = data.currentUser.workspaces;
    if (workspaces.length > 1) {
      return <ChooseWorkspace />;
    } else {
      const workspaceId = workspaces[0].id;
      localStorage.setItem('activeWorkspaceId', workspaceId);
      sessionIdVar(workspaceId);
    }
  }

  return <Component />;
};

const PrivateRoute = ({ Component }) => {
  const auth = useReactiveVar(sessionIdVar);
  if (!auth) {
    requestedRoute(window.location.pathname);
    return <Navigate to="/login" />;
  } else {
    return <CheckUserLoaded Component={Component} />;
  }
};
export default PrivateRoute;
