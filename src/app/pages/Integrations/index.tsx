import React from 'react';
import { Button } from '@chakra-ui/react';
import useSlackOauth from 'app/lib/hooks/oauth/useSlackOauth';

export const IntegrationsPage = () => {
  const { onClick, loading } = useSlackOauth();

  return (
    <Button onClick={onClick} isLoading={loading}>
      Arindam
    </Button>
  );
};
