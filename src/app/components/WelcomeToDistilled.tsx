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
    <VStack w="100%" spacing={10} backgroundColor="gray.100">
      <PageHeader text={`Hello ${data.currentUser.name?.split(' ')[0]} 👋`} />
      <SvgBlob
        variant="gradient"
        colors={['#2980B9', '#6DD5FA']}
        width="35%"
        height="35%"
        opacity="35%"
      />
      <Box marginTop={20} mb={4}>
        <Text fontSize={'6xl'} fontWeight="extrabold">
          Hello {data.currentUser.name?.split(' ')[0]} 🤙
        </Text>
        <Text fontSize={'md'} color={'gray.700'}>
          To get started, create a community plan and start setting some goals
        </Text>
      </Box>
    </VStack>
  );
};

export default WelcomeToDistilled;
