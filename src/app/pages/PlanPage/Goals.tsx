import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Divider,
  Avatar,
} from '@chakra-ui/react';
import type { Goal } from 'types';
import CreateNewGoalModal from 'app/components/CreateNewGoalModal';
import { formatDate } from 'app/lib/utilities';
import { FiTarget } from 'react-icons/fi';
import { Icon } from '@chakra-ui/react';
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Progress,
} from '@chakra-ui/react';
import GoalDrawer from './GoalDrawer';
import { completionFormatted } from 'app/lib/utilities';

const NewGoalsComponent = (props: {
  onNewGoal: () => void;
  firstGoal: boolean;
}) => {
  return (
    <Box pt={8}>
      <Button colorScheme={'brand'} size={'sm'} onClick={props.onNewGoal}>
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
  const [selectedGoal, setSelectedGoal] = useState<undefined | number>();
  return (
    <>
      <CreateNewGoalModal
        isOpen={isNewGoalModal}
        onClose={() => setIsNewGoalModal(false)}
      />
      {(() => {
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
              <TableContainer w={'100%'}>
                <Table variant="simple" size="sm">
                  <Tbody>
                    {([...props.goals] || [])
                      .sort((a, b) =>
                        new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1,
                      )
                      .map(goal => {
                        const completion = completionFormatted(
                          goal.completion!,
                        );
                        return (
                          <Tr
                            key={goal.id}
                            _hover={{ bg: 'brand.50' }}
                            onClick={() => setSelectedGoal(goal.id)}
                          >
                            <Td w={'100%'}>
                              <HStack marginLeft={'auto !important'}>
                                <Icon color={'gray.500'} as={FiTarget} />
                                <Text>{goal.title} </Text>
                              </HStack>
                            </Td>
                            <Td>
                              <HStack spacing={4}>
                                <Progress
                                  value={completion}
                                  borderRadius={8}
                                  colorScheme="green"
                                  w={'200px'}
                                />
                                <Text>{completion}%</Text>
                                <Text>On Track</Text>
                              </HStack>
                            </Td>
                            <Td>
                              <HStack marginLeft={'auto !important'}>
                                <Text
                                  color={'gray.500'}
                                  fontSize={'sm'}
                                  ml={'auto'}
                                >
                                  {formatDate(new Date(goal.expiresOn))}
                                </Text>

                                <Avatar
                                  name={goal.owner.name}
                                  size="xs"
                                  colorScheme={'gray'}
                                />
                              </HStack>
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </VStack>
        );
      })()}
      <GoalDrawer
        goalId={selectedGoal}
        onClose={() => setSelectedGoal(undefined)}
      />
    </>
  );
};

export default Goals;
