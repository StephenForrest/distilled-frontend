import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
  Text,
  Divider,
  HStack,
  Grid,
  Link,
} from '@chakra-ui/react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { onSignIn } from 'app/lib/mutations/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_AUTH } from 'app/lib/mutations/Auth';
import { requestedRoute } from 'app/lib/cache';
import useGoogleOauth from 'app/lib/hooks/oauth/useGoogleOauth';
import GoogleIcon from 'app/icons/Google';
import * as animationData from 'app/jsons/LoginAnimation.json';
import Lottie from 'react-lottie';
declare const window: any;

const { useState } = React;

export function Login() {
  const { onClick } = useGoogleOauth();
  const [createAuth, { loading, error }] = useMutation(CREATE_AUTH);
  const requestedPathname = useReactiveVar(requestedRoute);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  let location = useLocation();
  let navigate = useNavigate();
  let { from } = (location.state as { from: any }) || {
    from: { pathname: requestedPathname || '/' },
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const data = await createAuth({ variables: { email: login, password } });
      onSignIn(data.data.createAuth.sessionId);
      navigate(from);
      window.analytics.track('Logged In');
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
      <Grid templateColumns="repeat(2, 1fr)" gap={0} h={'100%'}>
        <Box
          w={'100%'}
          h={'100%'}
          background={'white'}
          mt="auto"
          display={'flex'}
          p={4}
        >
          <Box
            maxW={'400px'}
            width={'100%'}
            margin={'auto !important'}
            as="form"
            onSubmit={onSubmit}
          >
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
                type="submit"
                colorScheme={'brand'}
              >
                Log In
              </Button>
            </Stack>
            <Divider mt={6} mb={6} />
            <HStack>
              <Text fontSize="sm" textAlign="left" fontWeight="400">
                Don't have an account?
              </Text>
              <Link
                fontSize="sm"
                fontWeight="600"
                onClick={() => navigate('/signup')}
              >
                Sign up
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
                onClick={() => onClick(from)}
                leftIcon={<GoogleIcon boxSize="5" />}
              >
                Login with Google
              </Button>
            </HStack>
          </Box>
        </Box>
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
