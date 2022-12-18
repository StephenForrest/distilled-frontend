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
        <title>Welcome</title>
        <meta name="description" content="Welcome" />
      </Helmet>
      <VStack w={'100%'} h={'100%'} spacing={'12px'} pt={4} pb={4}>
        <WelcomeToDistilled />
        <Button
          bg="tertiary.500"
          textColor="white"
          onClick={() => setIsNewPlanModal(true)}
        >
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
