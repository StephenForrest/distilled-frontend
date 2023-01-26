import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import WelcomeToDistilled from 'app/components/WelcomeToDistilled';
import CreateNewPlanModal from 'app/components/CreateNewPlanModal';
import { Divider, Grid, Heading, VStack } from '@chakra-ui/react';

export function Page() {
  const [isNewPlanModal, setIsNewPlanModal] = useState<boolean>(false);
  return (
    <>
      <Helmet>
        <title>Welcome</title>
        <meta name="description" content="Welcome" />
      </Helmet>
      <Grid templateColumns="1fr" alignItems="center" justifyContent="center">
        <VStack align="center" justify="center">
          <WelcomeToDistilled />
        </VStack>
      </Grid>
      <Divider justifyContent="center" width="870px" />
      <Heading justifyContent="left" size="md" pl="6" mt="6">
        Get the most from Distilled
      </Heading>

      <CreateNewPlanModal
        isOpen={isNewPlanModal}
        onClose={() => setIsNewPlanModal(false)}
      />
    </>
  );
}
