import {
  Button,
  ButtonGroup,
  Stepper,
  StepperCompleted,
  StepperStep,
} from '@saas-ui/react';
import {
  Spacer,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Grid,
  Text,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Lottie from 'react-lottie';
import * as animationData from 'app/jsons/checkmark.json';
import * as React from 'react';

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

export function Onboarding() {
  const [step, setStep] = React.useState(0);
  const [dataForm, setDataForm] = React.useState<IShippingFields>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShippingFields>({
    mode: 'onChange',
  });

  function back() {
    setStep(step - 1);
  }

  const next = async () => {
    // Send the form data to Slapform
    if (dataForm && Object.keys(errors).length === 0) {
      setStep(step + 1);
      try {
        const data = await fetch(`https://api.slapform.com/vEpZatyM5`, {
          method: 'POST',
          body: JSON.stringify(dataForm),
        });
        return data.status;
      } catch (err) {
        throw new Error('err');
      }
    }
  };

  const steps = [
    {
      name: 'step 1',
      title: 'Information',
      children: (
        <Box>
          <FormControl pt="6">
            <FormLabel htmlFor="first-name">First Name</FormLabel>
            <Input
              {...register('firstName', {
                required: 'This is required!',
                minLength: { value: 3, message: 'Minimum length should be 3' },
              })}
              id="first-name"
              isRequired
              name="firstName"
              type="text"
            />
          </FormControl>
          {errors?.firstName && (
            <Box fontSize={'md'} color={'red'}>
              {errors.firstName.message}
            </Box>
          )}

          <FormControl mt={4}>
            <FormLabel htmlFor="last-name">Last Name</FormLabel>
            <Input
              {...register('lastName', {
                required: 'This is required!',
                minLength: { value: 4, message: 'Minimum length should be 4' },
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
              Number of Employees
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
      name: 'step 2',
      title: 'Pricing',
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
          <Box width={{ base: '100%' }} height={{ base: '100%' }}>
            <script
              async
              src="https://js.stripe.com/v3/pricing-table.js"
            ></script>
            <stripe-pricing-table
              pricing-table-id="prctbl_1MPnqqFCaczULzzDyLOoHu2h"
              publishable-key="pk_live_51M9DryFCaczULzzDhcLdJx0EA8pG3JuLAlqdRc4PkW1Nj4p9jD81Ez46qYroTdU2CYFclOf1kAkctGqHaPVwvCYa0064n7XlT2"
            ></stripe-pricing-table>
          </Box>
        </>
      ),
    },
    {
      name: 'step 3',
      title: 'Demo',
      children: (
        <Grid templateColumns="1fr" alignItems="center" justifyContent="center">
          <VStack align="center" justify="center">
            <iframe
              title="demo"
              src="https://demo.arcade.software/1KfsiicMWjdsE4m2SbNe?embed"
              width="720px"
              height="480px"
            />
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
      <Box
        as="form"
        onSubmit={handleSubmit(data => setDataForm(data))}
        width={{ base: '100%', md: '50%' }}
        mx="auto"
        px={8}
        py={6}
        rounded="lg"
        bg="gray.50"
      >
        <Stepper step={step} mx="auto" px="auto">
          {steps.map((args, i) => (
            <StepperStep key={i} {...args} />
          ))}
          <StepperCompleted mx="auto" px="auto" py="4">
            <Box>
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
            <Button alignSelf="flex-start" />
          </StepperCompleted>
        </Stepper>
        <ButtonGroup width="100%" py="4">
          <Button
            alignSelf="flex-start"
            label="Back"
            onClick={back}
            isDisabled={step === 0}
            variant="ghost"
          />
          <Spacer />
          <Button
            type="submit"
            alignSelf="flex-end"
            label="Next"
            onClick={next}
            isDisabled={step >= 3}
            colorScheme="primary"
          />
        </ButtonGroup>
      </Box>
    </>
  );
}
