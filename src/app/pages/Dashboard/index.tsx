import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { VStack, Button, Grid } from '@chakra-ui/react';
import WelcomeToDistilled from 'app/components/WelcomeToDistilled';
import CreateNewPlanModal from 'app/components/CreateNewPlanModal';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Stack,
  Heading,
  Text,
  StackDivider,
} from '@chakra-ui/react';

export function Page() {
  const [isNewPlanModal, setIsNewPlanModal] = useState<boolean>(false);
  return (
    <>
      <Helmet>
        <title>Welcome</title>
        <meta name="description" content="Welcome" />
      </Helmet>
      <WelcomeToDistilled />
      <VStack w={'100%'} h={'100%'} spacing={8} p={4}>
        <Grid templateColumns="repeat(2, 1fr)" gap={8} w={'80%'}>
          <Card>
            <CardHeader>
              <Heading size="md">Plan your goals</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Summary
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    View a summary of all your clients over the last month.
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Overview
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Check out the overview of your clients.
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Analysis
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    See a detailed analysis of all your business clients.
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md">Client Report</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Summary
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    View a summary of all your clients over the last month.
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Overview
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Check out the overview of your clients.
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Analysis
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    See a detailed analysis of all your business clients.
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </VStack>
      <CreateNewPlanModal
        isOpen={isNewPlanModal}
        onClose={() => setIsNewPlanModal(false)}
      />
    </>
  );
}
