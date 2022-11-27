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
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { SIGNUP, onSignIn } from 'app/lib/mutations/Auth';

const { useState } = React;

export function Signup() {
  const [signUp, { loading }] = useMutation(SIGNUP);
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
                <Button mt={4} type="submit" isLoading={loading}>
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
