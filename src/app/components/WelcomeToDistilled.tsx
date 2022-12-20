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
      backgroundColor="gray.100"
      position={'relative'}
      p={20}
    >
      <PageHeader text={`Hello ${data.currentUser.name?.split(' ')[0]} 👋`} />
      <Box position="absolute" top={0} left={0}>
        <SvgBlob
          variant="gradient"
          colors={['#2980B9', '#6DD5FA']}
          width="35%"
          height="35%"
          opacity="35%"
        />
      </Box>

      <Box position="absolute" top={'-50'} left={'50%'}>
        <SvgBlob
          variant="gradient"
          colors={['#2980B9', '#6DD5FA']}
          width="35%"
          height="35%"
          opacity="35%"
        />
      </Box>

      <Box position="absolute" bottom={'-50'} left={'0%'}>
        <SvgBlob
          variant="gradient"
          colors={['#2980B9', '#6DD5FA']}
          width="35%"
          height="35%"
          opacity="35%"
        />
      </Box>

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
