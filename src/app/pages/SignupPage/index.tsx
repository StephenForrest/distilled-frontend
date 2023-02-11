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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
  const [publicEmailErrorMessage, setPublicEmailErrorMessage] =
    useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const emailValidationRegex =
    /^(?!.*@(gmail|yahoo|hotmail|aol|outlook|icloud|protonmail|hubspot|zoho)\.[a-z]{2,}$)/;
  const passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}+$/;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasPublicEmailError = false;
    let hasPasswordError = false;

    if (!emailValidationRegex.test(login)) {
      hasPublicEmailError = true;
      setPublicEmailErrorMessage(
        'We apologize, but we only support private email addresses at the moment 😿',
      );
    } else {
      setPublicEmailErrorMessage('');
    }
    if (!passwordValidationRegex.test(password)) {
      hasPasswordError = true;
      setPasswordErrorMessage(
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number',
      );
    } else {
      setPasswordErrorMessage('');
    }
    if (hasPublicEmailError || hasPasswordError) {
      return;
    }
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
                {publicEmailErrorMessage && (
                  <Alert status="error" mb={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>Error</AlertTitle>
                    <AlertDescription>
                      {publicEmailErrorMessage}
                    </AlertDescription>
                  </Alert>
                )}
                <Stack spacing={6} w={'100%'}>
                  <Text fontSize="3xl">Sign Up</Text>
                  <FormControl
                    isInvalid={Boolean(publicEmailErrorMessage)}
                    size={'xs'}
                  >
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
                  <FormControl isInvalid={Boolean(passwordErrorMessage)}>
                    <FormLabel>Password</FormLabel>
                    {error && passwordErrorMessage && (
                      <Alert status="error" borderRadius={4} mb={4}>
                        <AlertIcon />
                        <AlertTitle mr={2}>Error</AlertTitle>
                        <AlertDescription>
                          {passwordErrorMessage}
                        </AlertDescription>
                      </Alert>
                    )}
                    <Input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FormControl>
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
                      onClick={() => onClick('/onboarding')}
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
