import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SLACK_INTEGRATION } from 'app/lib/mutations/Integration';
import { GET_INTEGRATIONS_BY_TYPE } from 'app/lib/queries/Integration';
import { onSignIn } from 'app/lib/mutations/Auth';
import { useNavigate } from 'react-router-dom';

const redirectUri = `${process.env.REACT_APP_API_ENDPOINT}/oauth-google`;
let openedWindow;

const useGoogleOauth = (customScopes?: string[]) => {
  const [fromUrl, setFromUrl] = useState<string | undefined>();
  const navigate = useNavigate();
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
  const [scopes, setScopes] = useState<string[]>(
    customScopes && customScopes?.length > 0
      ? customScopes
      : [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
  );

  const onMessage = useCallback(
    async e => {
      if (e.data.type === 'oauth-callback') {
        if (openedWindow) {
          openedWindow.close();
        }
        setLoading(false);
        onSignIn(e.data.searchParams.session_token);
        if (fromUrl) {
          navigate(fromUrl);
        }
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

  const gUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scopes
    .map(s => encodeURIComponent(s))
    .join('+')}&client_id=${
    process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
  }&redirect_uri=${redirectUri}&response_type=code`;

  const onClick = from => {
    openedWindow = window.open(gUrl, 'GOauth', 'height=600,width=600');
    setLoading(true);
    setFromUrl(from);
  };

  return { onClick, setScopes, loading };
};

export default useGoogleOauth;
