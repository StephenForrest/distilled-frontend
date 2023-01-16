import {
  Button,
  ButtonGroup,
  Stepper,
  StepperCompleted,
  StepperStep,
} from '@saas-ui/react';
import { Spacer } from '@chakra-ui/react';
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
      <Stepper step={step} mb="2">
        {steps.map((args, i) => (
          <StepperStep key={i} {...args} />
        ))}
        <StepperCompleted py="4">Completed</StepperCompleted>
      </Stepper>
      <ButtonGroup width="100%">
        <Button
          label="Back"
          onClick={back}
          isDisabled={step === 0}
          variant="ghost"
        />
        <Spacer />
        <Button
          label="Next"
          onClick={next}
          isDisabled={step >= 3}
          colorScheme="primary"
        />
      </ButtonGroup>
    </>
  );
}
