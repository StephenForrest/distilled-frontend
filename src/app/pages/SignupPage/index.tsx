import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Center,
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
  VStack,
  Divider,
  Text,
  Link,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { SIGNUP, onSignIn } from 'app/lib/mutations/Auth';
import { useNavigate } from 'react-router-dom';

const { useState } = React;

export function Signup() {
  const [signUp, { loading, error }] = useMutation(SIGNUP);
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await signUp({
      variables: { email: login, password, name },
    });
    onSignIn(data.data.signUp.sessionId);
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta name="description" content="Signup" />
      </Helmet>
      <VStack h={'100%'}>
        <Box
          w="400px"
          background={'white'}
          borderRadius={'8px'}
          mt="auto"
          mb="auto"
          rounded="lg"
          p={12}
        >
          <Center>
            <form onSubmit={onSubmit} className="full-width">
              <Stack spacing={6} w={'100%'}>
                <Text fontSize="3xl">Sign Up</Text>
                <FormControl size={'xs'}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                  />
                </FormControl>
                <FormControl size={'xs'}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormControl>
                {error && <Text as="i">{error.message}</Text>}
                <Button
                  mt={4}
                  colorScheme="brand"
                  type="submit"
                  isLoading={loading}
                >
                  Sign up
                </Button>
                <Divider mt="12px" mb="12px" />
                <Stack>
                  <Text fontSize="sm" textAlign="left" fontWeight="200">
                    <Link onClick={() => navigate('/login')}>
                      Login here if you already have an account
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Center>
        </Box>
      </VStack>
    </>
  );
}
