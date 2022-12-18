import React from 'react';
import { Button } from '@chakra-ui/react';
import useSlackOauth from 'app/lib/hooks/oauth/useSlackOauth';
import PageHeader from 'app/components/PageHeader';

export const IntegrationsPage = () => {
  const { onClick, loading } = useSlackOauth();

  return (
    <>
      <PageHeader text={'Integrations'} />
    </>
  );
};
