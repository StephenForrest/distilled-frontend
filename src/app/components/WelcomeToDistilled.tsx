import React from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import { Text, VStack, Box } from '@chakra-ui/react';
import { SvgBlob } from 'react-svg-blob';
import PageHeader from './PageHeader';
import WelcomeBanner from './WelcomeBanner';

function generateShapeProps() {
  return {
    size: 120,
    growth: 9,
    edges: 9,
  };
}

const WelcomeToDistilled = () => {
  const { loading: userLoading, error, data } = useQuery(CURRENT_USER);

  if (userLoading || error) {
    return null;
  }

  return (
    <VStack
      w="100%"
      spacing={10}
      backgroundImage="url('/background.svg')"
      position={'relative'}
      p={20}
    >
      <PageHeader text={`Hello ${data.currentUser.name?.split(' ')[0]} 👋`} />

      <Box>
        <Text fontSize={'6xl'} fontWeight="extrabold">
          Hello {data.currentUser.name?.split(' ')[0]} 🤙
        </Text>
        <Text fontSize={'md'} color={'gray.700'}>
          Here's a guide on how you can start using Distilled.
        </Text>
      </Box>
    </VStack>
  );
};

export default WelcomeToDistilled;
