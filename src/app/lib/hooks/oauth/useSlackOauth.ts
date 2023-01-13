import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SLACK_INTEGRATION } from 'app/lib/mutations/Integration';
import { GET_INTEGRATIONS_BY_TYPE } from 'app/lib/queries/Integration';

const redirectUri = `${process.env.REACT_APP_APP_ENDPOINT}/oauth-slack`;
let openedWindow;
const useSlackOauth = (customScopes?: String[]) => {
  const [createSlackIntegration] = useMutation(CREATE_SLACK_INTEGRATION, {
    refetchQueries: [
      {
        query: GET_INTEGRATIONS_BY_TYPE,
        variables: { integrationType: 'slack' },
      },
    ],
    awaitRefetchQueries: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [scopes, setScopes] = useState<String[]>(
    customScopes && customScopes?.length > 0
      ? customScopes
      : ['channels:read', 'users:read', 'channels:history'],
  );

  const onMessage = useCallback(
    async e => {
      if (e.data.type === 'oauth-callback') {
        if (openedWindow) {
          openedWindow.close();
        }
        await createSlackIntegration({
          variables: { code: e.data.searchParams.code },
        });
        setLoading(false);
      }
    },
    [setLoading, createSlackIntegration],
  );

  useEffect(() => {
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage, false);
    };
  }, []);

  const slackUrl = `https://slack.com/oauth/v2/authorize?scope=${scopes.join(
    ',',
  )}&client_id=${
    process.env.REACT_APP_SLACK_CLIENT
  }&redirect_uri=${redirectUri}`;

  const onClick = () => {
    openedWindow = window.open(slackUrl, 'SlackOauth', 'height=600,width=600');
    setLoading(true);
  };

  return { onClick, setScopes, loading };
};

export default useSlackOauth;
