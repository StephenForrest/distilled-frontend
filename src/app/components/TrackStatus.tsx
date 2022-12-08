import React from 'react';
import { Circle, HStack, Text } from '@chakra-ui/react';

const TrackingText = () => {
  return (
    <HStack spacing={2} mt={'12px'}>
      <Circle size="10px" bg="green.200" />
      <Text fontSize={'sm'}>On track</Text>
    </HStack>
  );
};

export default TrackingText;
