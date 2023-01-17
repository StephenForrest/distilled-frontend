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
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
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

export function Onboarding() {
  const [step, setStep] = React.useState(1);

  const handleSubmit = async event => {
    event.preventDefault();
    if (step === 1) {
      setStep(2); // move to next step if on step 1
    } else if (step === 2) {
      const formData = new FormData(event.target);
      try {
        await fetch('https://your-form-backend-url', {
          method: 'POST',
          body: formData,
        });
        setStep(3); // move to next step if on step 2 and form is submitted successfully
      } catch (error) {
        console.error(error);
      }
    }
  };

  function back() {
    setStep(step - 1);
  }

  const next = () => {
    setStep(step + 1);
  };

  const steps = [
    {
      name: 'step 1',
      title: 'First step',
      children: (
        <form onSubmit={handleSubmit}>
          <Box>
            <FormControl pt="6">
              <FormLabel htmlFor="first-name">First Name</FormLabel>
              <Input id="first-name" isRequired name="first-name" type="text" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="last-name">Last Name</FormLabel>
              <Input id="last-name" isRequired name="last-name" type="text" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="company">Company</FormLabel>
              <Input id="company" isRequired name="company" type="text" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Select id="role" isRequired name="role">
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
                isRequired
                id="number-of-employees"
                name="number-of-employees"
              >
                <option value="">Select the number of employees</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </Select>
            </FormControl>
            <button type="submit">Submit</button>
          </Box>
        </form>
      ),
    },

    {
      name: 'step 2',
      title: 'Second step',
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
      title: 'Third step',
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
      <Heading textAlign="center" mt={5} mb={4}>
        Tell us a bit about yourself
      </Heading>
      <Box
        as="form"
        width={{ base: '100%', md: '50%' }}
        mx="auto"
        px={8}
        py={6}
        rounded="lg"
        bg="gray.50"
      >
        <Stepper step={step} mx="auto" mb="2">
          {steps.map((args, i) => (
            <StepperStep key={i} {...args} />
          ))}
          <StepperCompleted py="4">Completed</StepperCompleted>
        </Stepper>
        <ButtonGroup width="100%">
          <Button
            alignSelf="flex-start"
            label="Back"
            onClick={back}
            isDisabled={step === 0}
            variant="ghost"
          />
          <Spacer />
          <Button
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
