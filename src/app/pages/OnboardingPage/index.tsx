import {
  Button,
  ButtonGroup,
  Stepper,
  StepperCompleted,
  StepperStep,
} from '@saas-ui/react';
import { Spacer, Box } from '@chakra-ui/react';
import * as React from 'react';
import SignupForm from './SignUpForm';
import Pricing from './PricingStep';
import Demo from './DemoStep';

export function Onboarding() {
  const [step, setStep] = React.useState(0);

  const back = () => {
    setStep(step - 1);
  };

  const next = () => {
    setStep(step + 1);
  };

  const steps = [
    {
      name: 'step 1',
      title: 'First step',
      children: <SignupForm />,
    },

    {
      name: 'step 2',
      title: 'Second step',
      children: <Pricing />,
    },
    {
      name: 'step 3',
      title: 'Third step',
      children: <Demo />,
    },
  ];

  return (
    <>
      <Box
        as="form"
        width={{ base: '100%', md: '500px' }}
        mx="auto"
        px={10}
        py={8}
        rounded="lg"
        bg="white"
      >
        <Stepper step={step} mb="2">
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
