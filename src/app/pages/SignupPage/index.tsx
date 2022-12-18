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
  Grid,
  HStack,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { SIGNUP, onSignIn } from 'app/lib/mutations/Auth';
import { useNavigate } from 'react-router-dom';
import * as animationData from 'app/jsons/LoginAnimation.json';
import Lottie from 'react-lottie';
import GoogleIcon from 'app/icons/Google';
import useGoogleOauth from 'app/lib/hooks/oauth/useGoogleOauth';

const { useState } = React;

export function Signup() {
  const { onClick } = useGoogleOauth();
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
      <Grid templateColumns="repeat(2, 1fr)" gap={0} h={'100%'}>
        <VStack h={'100%'}>
          <Box
            maxW={'400px'}
            background={'white'}
            mt="auto"
            mb="auto"
            w={'100%'}
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
                  <HStack>
                    <Text fontSize="sm" textAlign="left" fontWeight="400">
                      Already have an account?
                    </Text>
                    <Link
                      fontSize="sm"
                      fontWeight="600"
                      onClick={() => navigate('/login')}
                    >
                      Login here
                    </Link>
                  </HStack>
                  <HStack mt={6} mb={6}>
                    <Divider />
                    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                      or continue with
                    </Text>
                    <Divider />
                  </HStack>
                  <HStack w={'100%'} justifyContent={'center'}>
                    <Button
                      size={'md'}
                      onClick={() => onClick('/')}
                      leftIcon={<GoogleIcon boxSize="5" />}
                    >
                      Sign up with Google
                    </Button>
                  </HStack>
                </Stack>
              </form>
            </Center>
          </Box>
        </VStack>
        <Box
          w={'100%'}
          h={'100%'}
          background={'gray.100'}
          mt="auto !important"
          display={'flex'}
          alignItems={'center'}
          p={12}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={400}
            width={400}
          />
        </Box>
      </Grid>
    </>
  );
}
