import * as React from 'react';
import {
  Center,  Box,  Input,  Stack,  FormControl,  FormLabel,  Button,  Divider,  Text,  Link,  Grid,  HStack, Select, Flex,
  Heading, Spacer,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { SIGNUP, onSignIn } from 'app/lib/mutations/Auth';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import GoogleIcon from 'app/icons/Google';
import useGoogleOauth from 'app/lib/hooks/oauth/useGoogleOauth';
import { useForm } from 'react-hook-form';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiClipboard, FiUser } from 'react-icons/fi';
import * as animationDataComplete from 'app/jsons/checkmark.json';
import * as animationDataHero from 'app/jsons/LoginAnimation.json';
declare const window: any;

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  position: string;
};

export function Signup() {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();
  const { nextStep, activeStep } = useSteps({ initialStep: 0 });
  const navigate = useNavigate();
  const [signUp, { loading }] = useMutation(SIGNUP);
  const { onClick } = useGoogleOauth();

  const handleSignUpClick = async () => {
    if (activeStep === 0) {
      // Check that all required fields are filled in
      const values = getValues();
      if (!values.email || !values.password) {
        return;
      }
      nextStep();
    } else {
      // Check that all required fields are filled in
      const values = getValues();
      if (!values.firstName || !values.lastName || !values.company || !values.position) {
        return;
      }

      try {
        const result = await signUp({
          variables: {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            company: values.company,
            position: values.position,
          },
        });
        window.analytics.identify(result.data.signUp.user_id, {
          name: [values.firstName, values.lastName].join(' '),
          email: values.email,
          method: 'Email Signup',
        });
        window.analytics.track(
          'User Started Sign Up',
          {
            email: values.email,
            name: [values.firstName, values.lastName].join(' '),
          },
          err => {
            if (err) {
              console.error('Error tracking Segment event:', err);
            }
          },
        );
        // Have a little delay to let the animation play out, before signing in and going through email verification.
        setTimeout(() => onSignIn(result.data.signUp.sessionId), 2500)
        nextStep()
      } catch (e) {
        console.log(e)
      }
    }
  }

  const steps = [
    {
      label: 'Sign Up',
      icon: FiClipboard,
      children: (
        <Box
          maxW={'400px'}
          background={'white'}
          mt="auto"
          mb="auto"
          w={'100%'}
          onClick={e => e.stopPropagation()}
          alignItems={'center'}
        >
          <form className="full-width">
            <Stack spacing={6} w={'100%'}>
              <Text mt={4} fontSize="3xl">
                Sign Up
              </Text>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  {...register('email', { required: true })}
                  placeholder="name@example.com"
                  isRequired
                />
                {errors.email && (
                  <Text fontSize="xs" color="red.500">
                    Email is required
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register('password', { required: true, minLength: 8 })}
                  type="password"
                  placeholder="********"
                  isRequired
                />
                {errors.password && (
                  <Text fontSize="xs" color="red.500">
                    Password is required
                  </Text>
                )}
              </FormControl>
              <Button
                mt={4}
                type="submit"
                onClick={handleSignUpClick}
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
                  colorScheme="brand"
                  onClick={onClick}
                  leftIcon={<GoogleIcon boxSize="5" />}
                  width="400px"
                >
                  Sign up with Google
                </Button>
              </HStack>
            </Stack>
          </form>
        </Box>
      ),
    },
    {
      label: 'Information',
      icon: FiUser,
      children: (
        <Box
          maxW={'400px'}
          background={'white'}
          mt="auto"
          mb="auto"
          w={'100%'}
          alignItems={'center'}
        >
          <FormControl isRequired mt={4} size={'xs'}>
            <FormLabel htmlFor="first-name">First Name</FormLabel>
            <Input
              {...register('firstName', {
                required: true,
              })}
              id="first-name"
              name="firstName"
              type="text"
              isRequired
            />
          </FormControl>
          {errors?.firstName && (
            <Box fontSize={'md'} color={'red'}>
              {' '}
            </Box>
          )}

          <FormControl isRequired size={'xs'} mt={4}>
            <FormLabel htmlFor="last-name">Last Name</FormLabel>
            <Input
              {...register('lastName', {
                required: true,
              })}
              id="last-name"
              isRequired
              name="lastName"
              type="text"
            />
          </FormControl>
          {errors?.lastName && <Box fontSize={'md'} color={'red'}></Box>}

          <FormControl isRequired size={'xs'} mt={4}>
            <FormLabel htmlFor="company">Company</FormLabel>
            <Input
              {...register('company', {
                required: true,
              })}
              id="company"
              isRequired
              name="company"
              type="text"
            />
          </FormControl>
          {errors?.company && <Box fontSize={'md'} color={'red'}></Box>}
          <FormControl isRequired size={'xs'} mt={4}>
            <FormLabel htmlFor="position">Position</FormLabel>
            <Select
              {...register('position', {
                required: true,
              })}
              id="position"
              name="position"
            >
              <option value="">Select a position</option>
              <option value="developer">Developer Advocate</option>
              <option value="designer">Community Manager</option>
              <option value="product-manager">Leadership</option>
              <option value="product-manager">Purchasing</option>
              <option value="product-manager">Project Manager</option>
            </Select>
          </FormControl>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={0} h={'100%'}>
        <Center>
          <Flex
            alignItems="center"
            flexDir="column"
            width={{ base: '100%', md: '50%' }}
            px="5px"
          >
            <Steps activeStep={activeStep}>
              {steps.map(({ label, icon, children }, index) => (
                <Step label={label} icon={icon} key={index}>
                  {children}
                </Step>
              ))}
            </Steps>
            {activeStep === steps.length ? (
              <Flex px={4} py={4} width="100%" flexDirection="column">
                <Heading fontSize="xl" textAlign="center">
                  <Box mt="15px">
                    <Heading>Congratulations!</Heading>
                    <Text>You have completed the onboarding process.</Text>
                  </Box>
                  <Lottie
                    options={{
                      animationData: animationDataComplete, // this is the json object of the lottie file
                      loop: false,
                      autoplay: true,
                    }}
                    height={200}
                    width={200}
                  />
                </Heading>
              </Flex>
            ) : (
              <Center>
                <Flex alignItems="center" width="100%">
                  <Spacer />
                  {activeStep === 1 && (
                    <Button
                      mt={4}
                      size="md"
                      type="submit"
                      onClick={handleSignUpClick}
                      isLoading={loading}
                      width="400px"
                      colorScheme="brand"
                    >
                      Finish
                    </Button>
                  )}
                </Flex>
              </Center>
            )}
          </Flex>
        </Center>
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
              animationData: animationDataHero,
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
