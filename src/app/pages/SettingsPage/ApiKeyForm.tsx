import {
  VStack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiFileCopyLine } from 'react-icons/ri';
import { useQuery } from '@apollo/client';
import axios from 'axios';
import { GET_WORKSPACE_DETAILS } from 'app/lib/queries/Workspace';
import Loader from 'app/components/Loader';
import { IconContext } from 'react-icons';

const ApiKeyForm = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get('/api/jwt');
        setToken(response.data.token);
        localStorage.setItem('jwt', response.data.token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  }, [token]);

  return (
    <VStack w={'350px'} spacing={4} alignItems={'flex-start'} mt={4}>
      <Text fontSize={'sm'}>API Key</Text>
      <InputGroup size="sm">
        <Input
          placeholder=""
          type="text"
          value={token || ''}
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
              navigator.clipboard.writeText(token || '');
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

export default ApiKeyForm;
