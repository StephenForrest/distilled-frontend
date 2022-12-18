import React, { useState } from 'react';
import { Box, Button, VStack, Divider } from '@chakra-ui/react';
import type { Goal } from 'types';
import CreateNewGoalModal from 'app/components/CreateNewGoalModal';
import GoalsList from './GoalsList';
import * as animationData from 'app/jsons/EmptyBoxAnimation.json';
import Lottie from 'react-lottie';

const NewGoalsComponent = (props: {
  onNewGoal: () => void;
  firstGoal: boolean;
}) => {
  return (
    <Box pt={8}>
      <Button colorScheme={'brand'} size={'md'} onClick={props.onNewGoal}>
        {props.firstGoal ? (
          <span> Create your first goal </span>
        ) : (
          <span> Create new goal</span>
        )}
      </Button>
    </Box>
  );
};

const Goals = (props: { goals: Goal[] }) => {
  const [isNewGoalModal, setIsNewGoalModal] = useState<boolean>(false);
  return (
    <>
      <CreateNewGoalModal
        isOpen={isNewGoalModal}
        onClose={() => setIsNewGoalModal(false)}
      />
      {(() => {
        if (props.goals.length > 0) {
          return (
            <VStack spacing={8} w={'100%'} alignItems={'flex-start'}>
              <NewGoalsComponent
                firstGoal={props.goals.length === 0}
                onNewGoal={() => setIsNewGoalModal(true)}
              />
              <VStack
                spacing={0}
                divider={<Divider />}
                w={'100%'}
                alignItems={'flex-start'}
              >
                <GoalsList goals={props.goals} />
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
              <NewGoalsComponent
                firstGoal={props.goals.length === 0}
                onNewGoal={() => setIsNewGoalModal(true)}
              />
            </VStack>
          );
        }
      })()}
    </>
  );
};

export default Goals;
