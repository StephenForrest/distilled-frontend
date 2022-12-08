import React from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import { Text, VStack } from '@chakra-ui/react';
import LogoIcon from './LogoIcon';

const WelcomeToDistilled = () => {
  const { loading: userLoading } = useQuery(CURRENT_USER);

  if (userLoading) {
    return null;
  }

  return (
    <VStack p={8} w="100%">
      <LogoIcon />

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
