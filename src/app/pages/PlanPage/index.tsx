import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Center, Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GET_PLAN } from 'app/lib/queries/Plan';
import { useQuery } from '@apollo/client';
import type { Plan } from 'types';
import { NotFoundPage } from 'app/components/NotFoundPage/index';
import Goals from 'app/pages/PlanPage/Goals';

export function Page() {
  const { uuid } = useParams();
  const { data, loading } = useQuery<{ getPlan: Plan }>(GET_PLAN, {
    variables: { uuid },
  });
  if (loading) {
    return <Center>Loading...</Center>;
  } else if (!data) {
    return (
      <>
        <Helmet>
          <title>No plan found</title>
          <meta name="description" content="Plans page" />
        </Helmet>
        <NotFoundPage />
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Plan {data!.getPlan?.name}</title>
          <meta name="description" content="Plans page" />
        </Helmet>
        <Box p={6}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            {data!.getPlan?.name}
          </Text>
          <Goals goals={data!.getPlan?.goals || []} />
        </Box>
      </>
    );
  }
}
