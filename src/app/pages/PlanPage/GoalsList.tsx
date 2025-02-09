import React from 'react';
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Tooltip,
  Progress,
  HStack,
  Icon,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { selectedDrawerConfig } from 'app/lib/cache';
import AppIcons from 'app/components/AppIcons';
import { completionFormatted, formatDate } from 'app/lib/utilities';
import TrackStatus from 'app/components/TrackStatus';

type Props = {
  successCriteria: {
    endDate: Date;
  };
  formatDate: (date: Date) => string;
};

const DueDate: React.FC<Props> = props => {
  const formattedDate = props.formatDate(props.successCriteria.endDate);
  return <div>{formattedDate}</div>;
};

const GoalsList = (props: { goals }) => {
  return (
    <TableContainer w={'100%'}>
      <Table variant="simple" size="sm">
        <Tbody>
          {([...props.goals] || [])
            .sort((a, b) =>
              new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1,
            )
            .map(goal => {
              const completion = completionFormatted(goal.completion!);
              return (
                <Tr
                  key={goal.id}
                  _hover={{ bg: 'brand.50', cursor: 'pointer' }}
                  onClick={() => selectedDrawerConfig({ goalId: goal.id })}
                >
                  <Td w={'100%'}>
                    <HStack marginLeft={'auto !important'}>
                      <Icon color={'gray.500'} as={AppIcons['goal']} />
                      <Text>{goal.title} </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <HStack spacing={6}>
                      <Tooltip label="Tasks">
                        <HStack w={'40px'}>
                          <Icon color={'gray.500'} as={AppIcons['action']} />
                          <Text fontSize={'xs'}>{goal.actionsCount!}</Text>
                        </HStack>
                      </Tooltip>
                      <Tooltip label="Measurements">
                        <HStack w={'40px'}>
                          <Icon
                            color={'gray.500'}
                            as={AppIcons['measurement']}
                          />
                          <Text fontSize={'xs'}>{goal.measurementsCount!}</Text>
                        </HStack>
                      </Tooltip>
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
                      <Text w={'50px'}>{completion}%</Text>
                      <TrackStatus editable={false} />
                    </HStack>
                  </Td>
                  <Td>
                    <HStack marginLeft={'auto !important'}>
                      <Text color={'gray.500'} fontSize={'sm'} ml={'auto'}>
                        <DueDate
                          successCriteria={{ endDate: new Date() }}
                          formatDate={date => date.toLocaleDateString()}
                        />
                      </Text>

                      <Avatar
                        name={goal.owner.name}
                        size="xs"
                        colorScheme={'gray'}
                        src={goal.owner.profilePic}
                        referrerPolicy={'no-referrer'}
                      />
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default GoalsList;
