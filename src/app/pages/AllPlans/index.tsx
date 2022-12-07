import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Center,
  Box,
  Text,
  Stack,
  Divider,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from '@chakra-ui/react';
import { GET_PLANS } from 'app/lib/queries/Plan';
import { useQuery } from '@apollo/client';
import type { Plan } from 'types';
import { NotFoundPage } from 'app/components/NotFoundPage/index';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Td,
  TableContainer,
  HStack,
} from '@chakra-ui/react';
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
          <Card variant="elevated">
            <CardBody>
              <TableContainer w={'100%'}>
                <Table variant="simple" size="sm">
                  <thead>
                    <td>Plan</td>
                    <td>Objectives</td>
                    <td>Plan Owner</td>
                  </thead>
                  <Divider />
                  <Tbody>
                    <tr>
                      <td>Distilling Lab Q4 OKRs</td>
                      <td>Grow membership by 20%</td>
                      <td>James B</td>
                    </tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Box>
      </>
    );
  }
}
