import React from 'react';
import { Button } from '@chakra-ui/react';

export const IntegrationsPage = () => {
  const slackUrl =
    'https://slack.com/oauth/v2/authorize?scope=channels:read,users:read&client_id=4432808892116.4490962873093&redirect_uri=https://a19e-2405-201-a802-b965-e52c-439-96f-7e8a.in.ngrok.io/oauth-slack';
  const onClick = () => {
    window.open(slackUrl, 'Oauth', 'height=600,width=600');
  };

  return <Button onClick={onClick}>Arindam</Button>;
};
