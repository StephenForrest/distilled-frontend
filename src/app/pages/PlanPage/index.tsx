import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Center, Box, HStack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GET_PLAN } from 'app/lib/queries/Plan';
import { useQuery } from '@apollo/client';
import type { Plan } from 'types';
import { NotFoundPage } from 'app/components/NotFoundPage/index';
import Goals from 'app/pages/PlanPage/Goals';
import PageHeader from 'app/components/PageHeader';
import PlannerIcon from 'app/icons/Planner';
import Loader from 'app/components/Loader';

export function Page() {
  const { uuid } = useParams();
  const { data, loading } = useQuery<{ getPlan: Plan }>(GET_PLAN, {
    variables: { uuid },
  });
  if (loading) {
    return (
      <Center>
        <Box p={10}>
          <Loader size={8} />
        </Box>
      </Center>
    );
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
        <Box p={6} pt={0}>
          <PageHeader>
            <HStack spacing={1}>
              <PlannerIcon boxSize={6} />
              <Text fontSize={'2xl'} fontWeight={'bold'}>
                {data!.getPlan?.name}
              </Text>
            </HStack>
          </PageHeader>
          <Goals goals={data!.getPlan?.goals || []} />
        </Box>
      </>
    );
  }
}
