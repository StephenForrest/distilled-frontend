import React from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import { Text, VStack, Box } from '@chakra-ui/react';
import Background from './Background';
import PageHeader from './PageHeader';

const WelcomeToDistilled = () => {
  const { loading: userLoading, error, data } = useQuery(CURRENT_USER);

  if (userLoading || error) {
    return null;
  }

  return (
    <VStack w="100%" spacing={10}>
      <PageHeader text={`Hello ${data.currentUser.name?.split(' ')[0]} 👋`} />
      <Background />
      <Box marginTop={20}>
        <Text fontSize={'md'} color={'gray.600'}>
          To get started, create a community plan and start setting some goals
        </Text>
      </Box>
    </VStack>
  );
};

export default WelcomeToDistilled;
