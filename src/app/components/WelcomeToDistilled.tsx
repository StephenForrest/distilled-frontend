import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import { CREATE_SLACK_CONNECT } from 'app/lib/mutations/User';
import { Text, VStack, Box } from '@chakra-ui/react';
import PageHeader from './PageHeader';

function generateShapeProps() {
  return {
    size: 120,
    growth: 9,
    edges: 9,
  };
}

const WelcomeToDistilled = () => {
  const { loading: userLoading, error, data } = useQuery(CURRENT_USER);
  const [createChannelConnect, { loading }] = useMutation(CREATE_SLACK_CONNECT);
  if (userLoading || error) {
    return null;
  }

  const handleConnect = async () => {
    await createChannelConnect({
      variables: {
        email: data.currentUser.email,
        channelName: 'distilled-comp3',
      },
    });
  };

  return (
    <VStack
      w="100%"
      spacing={10}
      backgroundColor="white"
      position={'relative'}
      p={20}
    >
      <PageHeader text={`Welcome`} />

      <Box>
        <Text fontSize={'6xl'} fontWeight="extrabold">
          Hello {data.currentUser.name?.split(' ')[0]} 🤙
        </Text>
        <Text fontSize={'md'} color={'gray.700'}>
          Here's a guide on how you can start using Distilled.
        </Text>
        <button onClick={handleConnect}>Slack connect</button>
      </Box>
    </VStack>
  );
};

export default WelcomeToDistilled;
