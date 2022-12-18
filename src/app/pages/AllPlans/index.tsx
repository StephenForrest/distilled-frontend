import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Center, Box, Text } from '@chakra-ui/react';
import { Button, VStack, Grid } from '@chakra-ui/react';
import { GET_PLANS } from 'app/lib/queries/Plan';
import { useQuery } from '@apollo/client';
import type { Plan, Goal } from 'types';
import { NotFoundPage } from 'app/components/NotFoundPage/index';
import PageHeader from 'app/components/PageHeader';
import CreateNewPlanModal from 'app/components/CreateNewPlanModal';
import PlanItem from './PlanItem';

interface PlanList extends Plan {
  recentGoals: Goal[];
  goalsCount: number;
}

const EmptyPlansState = () => {
  const [isNewPlanModal, setIsNewPlanModal] = useState<boolean>(false);
  return (
    <VStack w={'100%'} height={'100%'} maxHeight={'200px'}>
      <Box margin={'auto !important'}>
        <VStack spacing={4}>
          <Text>You haven't created any plans yet.</Text>
          <Button colorScheme="brand" onClick={() => null}>
            Create new plan
          </Button>
        </VStack>
      </Box>
      <CreateNewPlanModal
        isOpen={isNewPlanModal}
        onClose={() => setIsNewPlanModal(false)}
      />
    </VStack>
  );
};

export function Page() {
  const { data, loading } = useQuery<{ getPlans: PlanList[] }>(GET_PLANS);
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
    const plans = data.getPlans;
    return (
      <VStack h={'100%'} alignItems={'flex-start'} w={'100%'}>
        <Helmet>
          <title>All Plans</title>
          <meta name="description" content="Plans page" />
        </Helmet>
        <Box p={8} h={'100%'} w={'100%'}>
          <PageHeader text={'All Plans'} />
          {(() => {
            if (!plans.length) {
              return <EmptyPlansState />;
            } else {
              return (
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  {plans.map(plan => (
                    <PlanItem plan={plan} key={plan.id} />
                  ))}
                </Grid>
              );
            }
          })()}
        </Box>
      </VStack>
    );
  }
}
