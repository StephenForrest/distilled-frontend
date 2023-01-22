import React, { useState } from 'react';
import {
  VStack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { RiFileCopyLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';

const ZapierIntegration = () => {
  const [apiKey, setApiKey] = useState('ab-12er34e7tsroot');
  return (
    <VStack w={'300px'} spacing={4} alignItems={'flex-start'} mt={4}>
      <Text fontSize={'sm'}>Api Key</Text>
      <InputGroup size="sm">
        <Input
          placeholder=""
          type="text"
          value={apiKey}
          textAlign={'center'}
          isReadOnly={true}
          disabled
        />
        <InputRightElement width="2rem">
          <Button
            h="100%"
            size="sm"
            minW={'45px'}
            borderTopLeftRadius={'none'}
            borderBottomLeftRadius={'none'}
            onClick={() => {
              navigator.clipboard.writeText(apiKey);
            }}
          >
            <IconContext.Provider value={{ size: '2rem', color: '#6c6f73c3' }}>
              <RiFileCopyLine />
            </IconContext.Provider>
          </Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
};

export default ZapierIntegration;
