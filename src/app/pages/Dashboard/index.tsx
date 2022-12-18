import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { VStack, Button } from '@chakra-ui/react';
import WelcomeToDistilled from 'app/components/WelcomeToDistilled';
import CreateNewPlanModal from 'app/components/CreateNewPlanModal';

export function Page() {
  const [isNewPlanModal, setIsNewPlanModal] = useState<boolean>(false);
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Well hello dashboard" />
      </Helmet>
      <VStack w={'100%'} spacing={'12px'} p={4}>
        <WelcomeToDistilled />
        <Button colorScheme="brand" onClick={() => setIsNewPlanModal(true)}>
          Create new plan
        </Button>
      </VStack>
      <CreateNewPlanModal
        isOpen={isNewPlanModal}
        onClose={() => setIsNewPlanModal(false)}
      />
    </>
  );
}
