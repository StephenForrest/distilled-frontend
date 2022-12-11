import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Center,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { onSignIn } from 'app/lib/mutations/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_AUTH } from 'app/lib/mutations/Auth';
import { requestedRoute } from 'app/lib/cache';

const { useState } = React;

export function Login() {
  const [createAuth, { loading, error }] = useMutation(CREATE_AUTH);
  const requestedPathname = useReactiveVar(requestedRoute);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  let location = useLocation();
  let navigate = useNavigate();
  let { from } = (location.state as { from: any }) || {
    from: { pathname: requestedPathname || '/' },
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await createAuth({ variables: { email: login, password } });
      onSignIn(data.data.createAuth.sessionId);
      navigate(from);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Helmet>
      <VStack h={'100%'}>
        <Box
          w="400px"
          background={'white'}
          borderRadius={'8px'}
          mt="auto"
          boxShadow="dark-lg"
          mb="auto"
          rounded="lg"
          p={12}
        >
          <Center>
            <form onSubmit={onSubmit} className="full-width">
              <Stack spacing={6} w={'100%'}>
                <Text fontSize="3xl">Sign In</Text>
                <FormControl size={'xs'}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
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
                  isLoading={loading}
                  loadingText={'Submitting'}
                  mt={4}
                  textColor={'black'}
                  bg="secondary.500"
                  type="submit"
                >
                  Log In
                </Button>
              </Stack>
              <Divider mt="24px" mb="12px" />
              <Stack>
                <Text fontSize="sm" textAlign="left" fontWeight="200">
                  Don't have an account?
                </Text>
                <Button
                  textColor={'white'}
                  bg="black"
                  variant="outline"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </Stack>
            </form>
          </Center>
        </Box>
      </VStack>
    </>
  );
}
