import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import { LogoFullBlack } from './LogoFull';

const BlockUserVerify = () => {
  return (
    <VStack w={'100%'} h={'100%'}>
      <Box margin={'auto !important'} maxW={'500px'}>
        <VStack spacing={12}>
          <LogoFullBlack />
          <Text align={'center'}>
            You haven't verified your email address yet. Please check your email
            and follow the verification link.
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
};

export default BlockUserVerify;
