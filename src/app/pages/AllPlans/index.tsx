import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Center, Box, Text } from '@chakra-ui/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  StackDivider,
  Stack,
  VStack,
  Grid,
  GridItem,
  Avatar,
  Progress,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { GET_PLANS } from 'app/lib/queries/Plan';
import { useQuery } from '@apollo/client';
import type { Plan, Goal } from 'types';
import { NotFoundPage } from 'app/components/NotFoundPage/index';
import { Table, Tbody, Tr, Td, TableContainer, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AppIcons from 'app/components/AppIcons';
import { formatDate, completionFormatted } from 'app/lib/utilities';

interface PlanList extends Plan {
  recentGoals: Goal[];
  goalsCount: number;
}

export function Page() {
  const navigate = useNavigate();
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
      <>
        <Helmet>
          <title>All Plans</title>
          <meta name="description" content="Plans page" />
        </Helmet>
        <Box p={8}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            All Plans
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={'24px'}>
            {plans.map(plan => {
              return (
                <Card key={plan.id} w={'100%'} bg={'white'} variant="elevated">
                  <CardHeader
                    onClick={() => navigate(`/plan/${plan.id}`)}
                    _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                    pb={2}
                  >
                    <Heading size="sm">{plan.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Heading size="sm" ml={4} mb={4}>
                      Objectives
                    </Heading>
                    <TableContainer w={'100%'}>
                      <Table variant="simple" size="sm">
                        <Tbody>
                          {(plan.recentGoals || []).map(goal => {
                            console.log(goal, 'goal');
                            return (
                              <Tr
                                key={goal.id}
                                _hover={{ bg: 'brand.50', cursor: 'pointer' }}
                              >
                                <Td w={'100%'}>
                                  <HStack>
                                    <Icon
                                      color={'gray.500'}
                                      as={AppIcons['goal']}
                                    />
                                    <Text>{goal.title} </Text>
                                  </HStack>
                                </Td>
                                <Td>
                                  <HStack spacing={6}>
                                    <Tooltip label="Actions">
                                      <HStack w={'40px'}>
                                        <Icon
                                          color={'gray.500'}
                                          as={AppIcons['action']}
                                        />
                                        <Text fontSize={'xs'}>
                                          {goal.actionsCount!}
                                        </Text>
                                      </HStack>
                                    </Tooltip>
                                    <Tooltip label="Measurements">
                                      <HStack w={'40px'}>
                                        <Icon
                                          color={'gray.500'}
                                          as={AppIcons['measurement']}
                                        />
                                        <Text fontSize={'xs'}>
                                          {goal.measurementsCount!}
                                        </Text>
                                      </HStack>
                                    </Tooltip>
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
                    {plan.goalsCount > 3 && (
                      <Box>
                        <Text
                          pl="4"
                          onClick={() => navigate(`/plan/${plan.id}`)}
                          mt={4}
                          fontSize="sm"
                          _hover={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                        >
                          {plan.goalsCount - 3} more
                        </Text>
                      </Box>
                    )}
                    {/* <Stack divider={<StackDivider />} spacing="2">
                      {plan.recentGoals!.map(goal => {
                        return (
                          <Box key={goal.id}>
                            <HStack>
                              <Icon color={'gray.500'} as={AppIcons['goal']} />
                              <Text fontSize="sm">{goal.title}</Text>
                            </HStack>
                          </Box>
                        );
                      })}
                      {plan.goalsCount > 3 && (
                        <Box>
                          <Text pt="2" fontSize="sm">
                            {plan.goalsCount - 3} more
                          </Text>
                        </Box>
                      )}
                    </Stack> */}
                  </CardBody>
                </Card>
              );
            })}
          </Grid>
          {/* <VStack spacing={4} w={'100%'} mt={'32px'}>
            {plans.map(plan => {
              console.log(plan, 'plan');
              return (
                <Card key={plan.id} w={'100%'} bg={'white'} variant="elevated">
                  <CardHeader
                    onClick={() => navigate(`/plan/${plan.id}`)}
                    _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    <Heading size="md">{plan.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="2">
                      {plan.recentGoals!.map(goal => {
                        return (
                          <Box key={goal.id}>
                            <HStack>
                              <Icon color={'gray.500'} as={AppIcons['goal']} />
                              <Text fontSize="sm">{goal.title}</Text>
                            </HStack>
                          </Box>
                        );
                      })}
                      {plan.goalsCount > 3 && (
                        <Box>
                          <Text pt="2" fontSize="sm">
                            {plan.goalsCount - 3} more
                          </Text>
                        </Box>
                      )}
                    </Stack>
                  </CardBody>
                </Card>
              );
            })}
          </VStack> */}
          {/* </Tbody> */}
          {/* </Table> */}
          {/* </TableContainer> */}
        </Box>
      </>
    );
  }
}
