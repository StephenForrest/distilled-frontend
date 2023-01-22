import React from 'react';
import {
  VStack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { RiFileCopyLine } from 'react-icons/ri';
import { useQuery } from '@apollo/client';
import { GET_WORKSPACE_DETAILS } from 'app/lib/queries/Workspace';
import Loader from 'app/components/Loader';
import { IconContext } from 'react-icons';

type Form = {
  apiKey: string;
};

const ZapierIntegrationForm = (props: { data: Form }) => {
  const { data } = props;
  return (
    <VStack w={'350px'} spacing={4} alignItems={'flex-start'} mt={4}>
      <Text fontSize={'sm'}>Api Key</Text>
      <InputGroup size="sm">
        <Input
          placeholder=""
          type="text"
          value={data.apiKey}
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
              navigator.clipboard.writeText(data.apiKey);
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

const ZapierIntegration = () => {
  const { data, loading } = useQuery(GET_WORKSPACE_DETAILS);

  if (loading) {
    return <Loader />;
  }

  return <ZapierIntegrationForm data={data.getWorkspaceDetails} />;
};

export default ZapierIntegration;
