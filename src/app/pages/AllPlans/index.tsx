import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Center, Box, Text } from '@chakra-ui/react';
import { GET_PLANS } from 'app/lib/queries/Plan';
import { useQuery } from '@apollo/client';
import type { Plan } from 'types';
import { NotFoundPage } from 'app/components/NotFoundPage/index';
import { Table, Tbody, Tr, Td, TableContainer, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function Page() {
  const navigate = useNavigate();
  const { data, loading } = useQuery<{ getPlans: Plan[] }>(GET_PLANS);
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
          <TableContainer w={'100%'}>
            <Table variant="simple" size="sm">
              <Tbody>
                {plans.map(plan => {
                  return (
                    <Tr
                      key={plan.id}
                      _hover={{ bg: 'brand.50', cursor: 'pointer' }}
                      onClick={() => navigate(`/plan/${plan.id}`)}
                    >
                      <Td w={'100%'}>
                        <HStack marginLeft={'auto !important'}>
                          <Text>{plan.name} </Text>
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}
