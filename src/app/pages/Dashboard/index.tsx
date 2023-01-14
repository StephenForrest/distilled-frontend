import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import WelcomeToDistilled from 'app/components/WelcomeToDistilled';
import CreateNewPlanModal from 'app/components/CreateNewPlanModal';
import { Grid, VStack } from '@chakra-ui/react';

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
          <iframe
            title="demo"
            src="https://demo.arcade.software/1KfsiicMWjdsE4m2SbNe?embed"
            width="720px"
            height="480px"
          />
        </VStack>
      </Grid>
      <CreateNewPlanModal
        isOpen={isNewPlanModal}
        onClose={() => setIsNewPlanModal(false)}
      />
    </>
  );
}
