import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Center, Box, Text, HStack } from '@chakra-ui/react';
import { Button, VStack, Grid } from '@chakra-ui/react';
import { GET_PLANS } from 'app/lib/queries/Plan';
import { useQuery } from '@apollo/client';
import type { Plan, Goal } from 'types';
import { NotFoundPage } from 'app/components/NotFoundPage/index';
import PageHeader from 'app/components/PageHeader';
import CreateNewPlanModal from 'app/components/CreateNewPlanModal';
import PlanItem from './PlanItem';
import * as animationData from 'app/jsons/EmptyStateAnimation.json';
import Lottie from 'react-lottie';
import PlanFilters from './PlanFilters';
import fuzzysort from 'fuzzysort';
import PlannerIcon from 'app/icons/Planner';

interface PlanList extends Plan {
  recentGoals: Goal[];
  goalsCount: number;
}

const EmptyPlansState = (props: {
  isNewPlanModal: boolean;
  setIsNewPlanModal: (value: boolean) => void;
}) => {
  const { isNewPlanModal, setIsNewPlanModal } = props;
  return (
    <VStack w={'100%'} height={'100%'} maxHeight={'200px'}>
      <Box margin={'auto !important'}>
        <VStack spacing={8}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={300}
            width={300}
          />
          <Text>You haven't created any plans yet.</Text>
          <Button colorScheme="brand" onClick={() => setIsNewPlanModal(true)}>
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
  const [isNewPlanModal, setIsNewPlanModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [filteredPlans, setFilteredPlans] = useState<PlanList[]>([]);
  const { data, loading } = useQuery<{ getPlans: PlanList[] }>(GET_PLANS, {
    fetchPolicy: 'no-cache',
  });

  useMemo(() => {
    if (data) {
      if (search.length > 0) {
        const d = fuzzysort.go(search, data.getPlans, { key: 'name' });
        setFilteredPlans(d.map(res => res.obj));
      } else {
        setFilteredPlans(data.getPlans);
      }
    } else {
      return [];
    }
  }, [data, search]);

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
        {plans.length > 0 && (
          <PlanFilters
            setIsNewPlanModal={setIsNewPlanModal}
            search={search}
            setSearch={setSearch}
          />
        )}
        <Box p={8} pt={4} w={'100%'}>
          <PageHeader>
            <HStack spacing={1}>
              <PlannerIcon boxSize={6} />
              <Text fontSize={'2xl'} fontWeight={'bold'}>
                All Plans
              </Text>
            </HStack>
          </PageHeader>
          {(() => {
            if (!plans.length) {
              return (
                <EmptyPlansState
                  isNewPlanModal={isNewPlanModal}
                  setIsNewPlanModal={setIsNewPlanModal}
                />
              );
            } else {
              return (
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  {filteredPlans.map(plan => (
                    <PlanItem plan={plan} key={plan.id} />
                  ))}
                </Grid>
              );
            }
          })()}
        </Box>
        <CreateNewPlanModal
          isOpen={isNewPlanModal}
          onClose={() => setIsNewPlanModal(false)}
        />
      </VStack>
    );
  }
}
