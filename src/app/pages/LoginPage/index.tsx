import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Center,
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
  Text,
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
      <Container w="400px">
        <Box p={8} w={'100%'}>
          <Center>
            <form onSubmit={onSubmit} className="full-width">
              <Stack spacing={6} w={'100%'}>
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
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Center>
        </Box>
      </Container>
    </>
  );
}
