import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Lottie from 'react-lottie';
import { useLocation, useNavigate } from 'react-router-dom';
import * as animationData from 'app/jsons/checkmark.json';
import { CURRENT_USER } from 'app/lib/queries/User';
import { activeWorkspaceIdVar } from 'app/lib/cache';
import { useQuery, useReactiveVar, useMutation } from '@apollo/client';
import {
  Button,
  Flex,
  Heading,
  Box,
  Spacer,
  Text,
  Grid,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  AspectRatio,
} from '@chakra-ui/react';
import * as React from 'react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiClipboard, FiDollarSign, FiUser } from 'react-icons/fi';
import { PASS_ONBOARDING_STEP } from 'app/lib/mutations/Workspace';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['stripe-pricing-table']: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface IShippingFields {
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  numOfEmployees: string;
}

export default function Onboarding() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeWorkspaceId = useReactiveVar(activeWorkspaceIdVar);
  const [passOnboardingStep] = useMutation(PASS_ONBOARDING_STEP);

  const getInitialStep = () => {
    if (location.pathname === '/onboarding-subscription') return 1;
    if (location.pathname === '/onboarding-demo') return 2;
    return 0;
  };
  const { nextStep, activeStep } = useSteps({
    initialStep: getInitialStep(),
  });
  const {
    register,
    handleSubmit: handleSubmitReactHook,
    formState: { errors },
  } = useForm<IShippingFields>({
    mode: 'onChange',
  });

  const handleSubmit = async (data: IShippingFields) => {
    await passOnboardingStep({
      variables: { name: 'SURVEY' },
      refetchQueries: [{ query: CURRENT_USER }],
    });
    nextStep();
    const slap = new window.Slapform();
    await slap.submit({
      form: 'vEpZatyM5',
      data,
    });
  };

  const next = async () => {
    const name = getStepName(activeStep);
    await passOnboardingStep({
      variables: { name },
      refetchQueries: [{ query: CURRENT_USER }],
    });
    nextStep();
  };

  const getStepName = (step: number) => {
    if (step === 1) return 'SUBSCRIPTION';
    if (step === 2) return 'DEMO';
  };

  const steps = [
    {
      label: 'Information',
      icon: FiUser,
      children: (
        <Box width={{ base: '100%' }} mb="15px">
          <FormControl pt="6">
            <FormLabel htmlFor="first-name">First Name</FormLabel>
            <Input
              {...register('firstName', {
                required: 'This is required!',
              })}
              id="first-name"
              isRequired
              name="firstName"
              type="text"
            />
          </FormControl>
          {errors?.firstName && (
            <Box fontSize={'md'} color={'red'}>
              {' '}
              {errors.firstName.message}{' '}
            </Box>
          )}

          <FormControl mt={4}>
            <FormLabel htmlFor="last-name">Last Name</FormLabel>
            <Input
              {...register('lastName', {
                required: 'This is required!',
              })}
              id="last-name"
              isRequired
              name="lastName"
              type="text"
            />
          </FormControl>
          {errors?.lastName && (
            <Box fontSize={'md'} color={'red'}>
              {errors.lastName.message}
            </Box>
          )}

          <FormControl mt={4}>
            <FormLabel htmlFor="company">Company</FormLabel>
            <Input
              {...register('company', {
                required: 'This is required!',
              })}
              id="company"
              isRequired
              name="company"
              type="text"
            />
          </FormControl>
          {errors?.company && (
            <Box fontSize={'md'} color={'red'}>
              {errors.company.message}
            </Box>
          )}
          <FormControl mt={4}>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select {...register('role')} id="role" isRequired name="role">
              <option value="">Select a role</option>
              <option value="developer">Developer Advocate</option>
              <option value="designer">Community Manager</option>
              <option value="product-manager">Leadership</option>
              <option value="product-manager">Purchasing</option>
              <option value="product-manager">Project Manager</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="number-of-employees">
              Number of Employees!
            </FormLabel>
            <Select
              {...register('numOfEmployees')}
              isRequired
              id="number-of-employees"
              name="numOfEmployees"
            >
              <option value="">Select the number of employees</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="500+">500+</option>
            </Select>
          </FormControl>
        </Box>
      ),
    },
    {
      label: 'Pricing',
      icon: FiDollarSign,
      children: (
        <>
          <Helmet>
            <title>Pricing</title>
            <meta name="description" content="Pricing" />
            <script
              async
              src="https://js.stripe.com/v3/pricing-table.js"
            ></script>
          </Helmet>
          <Box width={{ base: '100%' }} height={{ base: '100%' }} my="15px">
            <stripe-pricing-table
              pricing-table-id={process.env.REACT_APP_STRIPE_PRICING_TABLE_ID}
              client-reference-id={activeWorkspaceId}
              publishable-key={process.env.REACT_APP_STRIPE_PUSHABLE_KEY}
            ></stripe-pricing-table>
          </Box>
        </>
      ),
    },
    {
      label: 'Demo',
      icon: FiClipboard,
      children: (
        <Grid
          templateColumns="1fr"
          alignItems="center"
          justifyContent="center"
          mt="15px"
        >
          <Helmet>
            <script
              type="text/javascript"
              src="https://assets.calendly.com/assets/external/widget.js"
              async
            ></script>
          </Helmet>
          <VStack align="center" justify="center">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/james_bohrman/30min"
              style={{ minWidth: '720px', height: '540px' }}
            ></div>
          </VStack>
        </Grid>
      ),
    },
  ];

  return (
    <>
      <Heading textAlign="center" pt={20} pb={10} mb={4}>
        Let's get started! 💪
      </Heading>
      <Box display="flex" flexDir="column" justifyContent="center">
        <Box
          as="form"
          onSubmit={handleSubmitReactHook(handleSubmit)}
          display="flex"
          justifyContent="center"
        >
          <Flex
            alignItems="center"
            flexDir="column"
            width={{ base: '100%', md: '50%' }}
            px="15px"
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
                      animationData: animationData, // this is the json object of the lottie file
                      loop: false,
                      autoplay: true,
                    }}
                    height={200}
                    width={200}
                  />
                </Heading>
                <Button
                  mx="auto"
                  mt={6}
                  size="sm"
                  colorScheme="brand"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Start
                </Button>
              </Flex>
            ) : (
              <Flex width="100%" justify="flex-end">
                <Spacer />
                {activeStep === 0 && (
                  <Button size="sm" colorScheme="brand" type="submit">
                    Next
                  </Button>
                )}
                {activeStep === 2 && (
                  <Button size="sm" onClick={next} colorScheme="brand">
                    Finish
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
