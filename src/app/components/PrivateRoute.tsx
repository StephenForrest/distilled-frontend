import { useReactiveVar } from '@apollo/client';
import cache, {
  sessionIdVar,
  requestedRoute,
  activeWorkspaceIdVar,
} from 'app/lib/cache';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import Loader from 'app/components/Loader';
import {
  useLocation,
  useNavigate,
  NavigateFunction,
  Location,
} from 'react-router-dom';
import { observe, send } from '@absinthe/socket';
import { getSocket, reconnectSocket } from '../services/websockets/socket';
import { ErrorMessages } from '../services/websockets/constants';
import { userSubscription } from '../services/websockets/subscriptions';
import { ResultResponse } from '../services/websockets/types';
import { Workspace } from 'types';

import ChooseWorkspace from 'app/components/ChooseWorkspace';
import CreateWorkspace from 'app/components/CreateWorkspace';
import BlockUserVerify from 'app/components/BlockUserVerifyPage';

// const handleRedirects = (
//   workspace: Workspace,
//   navigation: NavigateFunction,
//   location: Location,
// ) => {
//   if (!workspace.currentOnboardingStep) return;
//   if (location.pathname === '/onboarding') return;
//   if (
//     workspace.currentOnboardingStep === 'demo' &&
//     location.pathname !== '/onboarding-demo'
//   )
//     return navigation('/onboarding-demo');
//   if (
//     workspace.currentOnboardingStep === 'subscription' &&
//     location.pathname !== '/onboarding-subscription'
//   )
//     return navigation('/onboarding-subscription');
//   if (
//     workspace.currentOnboardingStep === 'survey' &&
//     location.pathname !== '/onboarding'
//   )
//     return navigation('/onboarding');
// };

const subscribeToWS = workspaceId => {
  const socket = getSocket();

  const notifier = send(socket, {
    operation: userSubscription,
    variables: { id: `private:workspace:${workspaceId}` },
  });

  const onResult = ({ data: { channel } }: ResultResponse) => {
    switch (channel.type) {
      case 'success_criteria_updated': {
        // TODO (atanych): I hate this shit, better to revisit that
        cache.modify({
          id: cache.identify({
            __typename: 'SuccessCriteria',
            id: channel.payload.id,
          }),
          fields: {
            completion() {
              return channel.payload.completion;
            },
          },
        });
        break;
      }
      default:
        break;
    }
  };

  observe(socket, notifier, {
    onError: ({ message }: Error) => {
      if (
        message === ErrorMessages.CONNECTION_CLOSED ||
        message === ErrorMessages.REQUEST_TIMEOUT ||
        message === ErrorMessages.CHANNEL_JOIN_TIMEOUT
      ) {
        // In the case of chanel timeout subscriptions will be automatically reestablished
        return;
      }
      console.error('WS error', message);
    },
    onAbort: () => reconnectSocket(),
    onResult,
  });
};

const CheckUserLoaded = ({ Component }) => {
  const activeWorkspaceId = useReactiveVar(activeWorkspaceIdVar);
  const navigate = useNavigate();
  const location = useLocation();
  const { data, loading: userLoading } = useQuery(CURRENT_USER);

  if (userLoading) {
    return <Loader />;
  }

  if (!data.currentUser.emailVerified) {
    return <BlockUserVerify />;
  }

  if (!activeWorkspaceId) {
    const workspaces = data.currentUser.workspaces;
    if (workspaces.length > 1) {
      return <ChooseWorkspace />;
    } else if (workspaces.length === 0) {
      return <CreateWorkspace currentUser={data.currentUser} />;
    } else {
      const workspaceId = workspaces[0].id;
      localStorage.setItem('activeWorkspaceId', workspaceId);
      subscribeToWS(workspaceId);
      sessionIdVar(workspaceId);
      // handleRedirects(workspaces[0], navigate, location);
    }
  } else {
    const workspaces = data.currentUser.workspaces;

    localStorage.setItem('activeWorkspaceId', activeWorkspaceId);
    subscribeToWS(activeWorkspaceId);
    // handleRedirects(workspaces[0], navigate, location);
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
