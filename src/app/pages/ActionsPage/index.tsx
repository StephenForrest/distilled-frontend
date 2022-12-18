import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from 'app/components/PageHeader';

export function ActionPage() {
  return (
    <>
      <Helmet>
        <title>Welcome</title>
        <meta name="description" content="Welcome" />
      </Helmet>
      <PageHeader text={'Actions'} />
    </>
  );
}
