import React, { useState, useMemo } from 'react';
import { Box, Button, VStack, Divider } from '@chakra-ui/react';
import type { Goal } from 'types';
import CreateNewGoalModal from 'app/components/CreateNewGoalModal';
import GoalsList from './GoalsList';
import * as animationData from 'app/jsons/EmptyBoxAnimation.json';
import Lottie from 'react-lottie';
import { AddIcon } from '@chakra-ui/icons';
import GoalFilters from './GoalFilters';
import fuzzysort from 'fuzzysort';

const NewGoalsComponent = (props: {
  onNewGoal: () => void;
  firstGoal: boolean;
}) => {
  return (
    <Button
      colorScheme={'brand'}
      size={'sm'}
      onClick={props.onNewGoal}
      leftIcon={<AddIcon />}
    >
      {props.firstGoal ? (
        <span> Create your first goal </span>
      ) : (
        <span> Create new goal</span>
      )}
    </Button>
  );
};

const Goals = (props: { goals: Goal[] }) => {
  const [isNewGoalModal, setIsNewGoalModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const { goals } = props;

  useMemo(() => {
    if (goals) {
      if (search.length > 0) {
        const d = fuzzysort.go(search, goals, { key: 'title' });
        setFilteredGoals(d.map(res => res.obj));
      } else {
        setFilteredGoals(goals);
      }
    } else {
      return [];
    }
  }, [goals, search]);

  return (
    <>
      <CreateNewGoalModal
        isOpen={isNewGoalModal}
        onClose={() => setIsNewGoalModal(false)}
      />
      {(() => {
        if (props.goals.length > 0) {
          return (
            <VStack spacing={6} w={'100%'} alignItems={'flex-start'}>
              <GoalFilters
                search={search}
                setIsNewGoalModal={setIsNewGoalModal}
                setSearch={setSearch}
              />
              <VStack
                spacing={0}
                divider={<Divider />}
                w={'100%'}
                alignItems={'flex-start'}
              >
                <GoalsList goals={filteredGoals} />
              </VStack>
            </VStack>
          );
        } else {
          return (
            <VStack spacing={8} w={'100%'}>
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
              <Box pt={8}>
                <NewGoalsComponent
                  firstGoal={props.goals.length === 0}
                  onNewGoal={() => setIsNewGoalModal(true)}
                />
              </Box>
            </VStack>
          );
        }
      })()}
    </>
  );
};

export default Goals;
