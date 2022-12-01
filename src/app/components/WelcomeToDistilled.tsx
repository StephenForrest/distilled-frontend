import React from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import { Text, VStack } from '@chakra-ui/react';

const WelcomeToDistilled = () => {
  const { loading: userLoading } = useQuery(CURRENT_USER);

  if (userLoading) {
    return null;
  }

  return (
    <VStack p={8} w="100%">
      <Text fontSize="2xl" p={4} fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>

      <Text fontSize={'xl'} fontWeight={'bold'}>
        Welcome to Distilled
      </Text>
      <Text fontSize={'m'} color={'gray.600'} mt={4}>
        To get started, create a community plan and start setting some goals
      </Text>
    </VStack>
  );
};

export default WelcomeToDistilled;
