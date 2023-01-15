import React, { useState } from 'react';

import {
  GoalWithDetails,
  MeasurementTrackingType,
  GoalMeasurementFormErrors,
  MeasurementSlackForm,
  GoalMeasurementForm,
} from 'types';
import { DrawerHeader, DrawerBody, Text } from '@chakra-ui/react';
import Header from '../Header';
import {
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
  Divider,
  VStack,
  Textarea,
  HStack,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  getDateNDaysFromToday,
  formatDateForInput,
  convertDateToUTC,
} from 'app/lib/utilities';
import SlackForm from './SlackForm';
import {
  CREATE_SUCCESS_CRITERIA,
  UPDATE_SUCCESS_CRITERIA_MUTATION,
} from 'app/lib/mutations/SuccessCriteria';
import { GET_GOAL } from 'app/lib/queries/Plan';
import { useMutation } from '@apollo/client';

export const NewMeasurementForm = (props: {
  goal: GoalWithDetails;
  existingForm?: Partial<MeasurementSlackForm>;
  onBack: () => void;
  successCriteriaId?: string;
}) => {
  const { goal, existingForm, successCriteriaId, onBack } = props;
  const [createSuccessCriteriaMutation, { loading }] = useMutation(
    CREATE_SUCCESS_CRITERIA,
    {
      refetchQueries: [{ query: GET_GOAL, variables: { id: goal.id } }],
      awaitRefetchQueries: true,
    },
  );

  const [updateSuccessCriteriaMutation, { loading: updateLoading }] =
    useMutation<{
      updateSuccessCriteria: {
        successCriteria: unknown;
        errors: GoalMeasurementFormErrors;
      };
    }>(UPDATE_SUCCESS_CRITERIA_MUTATION, {
      refetchQueries: ['getPlans'],
    });
  const [formErrors, setFormErrors] = useState<GoalMeasurementFormErrors>({});
  const endDate = formatDateForInput(
    new Date(new Date(goal.expiresOn).toString()),
  );
  const [form, setForm] = useState<MeasurementSlackForm>(
    (): MeasurementSlackForm => {
      let trackingSettings;
      if (
        existingForm?.trackingType === 'slack' &&
        existingForm?.trackingSettings?.channelFilters
      ) {
        trackingSettings = {
          ...existingForm.trackingSettings,
          channelFilters: existingForm.trackingSettings.channelFilters.map(
            f => ({ name: f.name, slackChannelId: f.slackChannelId }),
          ),
        };
      } else {
        trackingSettings = existingForm?.trackingSettings || {};
      }
      const result = {
        name: existingForm?.name ?? '',
        description: existingForm?.description || '',
        trackingType: existingForm?.trackingType || 'slack',
        startDate: existingForm?.startDate || getDateNDaysFromToday(0),
        endDate: existingForm?.endDate || endDate,
        trackingSettings,
      } as MeasurementSlackForm;
      return result;
    },
  );

  const updateErrors = (attr: keyof GoalMeasurementForm, value: unknown) => {
    setFormErrors({ ...formErrors, [attr]: value });
  };

  const updateTrackingType = trackingType => {
    setForm({ ...form, trackingType });
  };

  const updateForm = (attr: keyof MeasurementSlackForm, value: unknown) => {
    setForm({ ...form, [attr]: value });
    if (attr !== 'trackingSettings') {
      updateErrors(attr, undefined);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form.trackingSettings', form.trackingSettings);
    const variables = {
      goalId: goal.id,
      name: form.name,
      description: form.description,
      startDate: convertDateToUTC(form.startDate),
      endDate: convertDateToUTC(form.endDate),
      trackingSettings: { [form.trackingType]: form.trackingSettings },
    };

    if (!successCriteriaId) {
      const result = await createSuccessCriteriaMutation({
        variables: { ...variables, successCriteriaType: 'measurement' },
      });
      if (
        result?.data?.createSuccessCriteria?.errors as GoalMeasurementFormErrors
      ) {
        setFormErrors(result.data?.createSuccessCriteria?.errors || {});
      } else {
        onBack();
      }
    } else {
      const result = await updateSuccessCriteriaMutation({
        variables: {
          ...variables,
          successCriteriaId,
          successCriteriaType: 'measurement',
        },
      });
      if (
        result?.data?.updateSuccessCriteria?.errors as GoalMeasurementFormErrors
      ) {
        setFormErrors(result.data?.updateSuccessCriteria?.errors || {});
      } else {
        onBack();
      }
    }
  };

  return (
    <VStack>
      <form onSubmit={onSubmit} className="full-width">
        <Stack spacing={6} w={'100%'}>
          <FormControl isRequired isInvalid={!!formErrors.name}>
            <FormLabel fontSize={'small'}>Name</FormLabel>
            <Input
              type="text"
              value={form.name}
              onChange={e => updateForm('name', e.target.value)}
              maxWidth={'300px'}
              size={'sm'}
            />
            <FormErrorMessage fontSize={'xs'}>
              {formErrors.name}
            </FormErrorMessage>
          </FormControl>
          <HStack spacing="24px" alignItems={'flex-start'}>
            <VStack spacing={0} alignItems={'flex-start'}>
              <FormControl isRequired isInvalid={!!formErrors.startDate}>
                <FormLabel fontSize={'small'}>Start date</FormLabel>
                <Input
                  type="date"
                  size={'sm'}
                  width={'150px'}
                  value={form.startDate}
                  onChange={e => updateForm('startDate', e.target.value)}
                />
                <FormErrorMessage fontSize={'xs'}>
                  {formErrors.startDate}
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack spacing={0} alignItems={'flex-start'}>
              <FormControl isRequired isInvalid={!!formErrors.endDate}>
                <FormLabel fontSize={'small'}>End date</FormLabel>
                <Input
                  type="date"
                  size={'sm'}
                  width={'150px'}
                  value={form.endDate}
                  onChange={e => updateForm('endDate', e.target.value)}
                />
                <FormErrorMessage fontSize={'xs'}>
                  {formErrors.endDate}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </HStack>
          <FormControl isInvalid={!!formErrors.description}>
            <FormLabel fontSize={'small'}>Description</FormLabel>
            <Textarea
              value={form.description}
              onChange={e => updateForm('description', e.target.value)}
              size={'sm'}
            />
            <FormErrorMessage fontSize={'xs'}>
              {formErrors.description}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'small'}>Tracking type</FormLabel>
            <Select
              size={'sm'}
              width={'300px'}
              value={form.trackingType}
              onChange={e =>
                updateTrackingType(e.target.value as MeasurementTrackingType)
              }
            >
              <option value="slack">Slack</option>
            </Select>
            {(() => {
              if (form.trackingType === 'slack') {
                return (
                  <SlackForm
                    settings={form.trackingSettings}
                    errors={formErrors.trackingSettings}
                    onUpdate={settings =>
                      updateForm('trackingSettings', settings)
                    }
                    onUpdateErrors={errors =>
                      updateErrors('trackingSettings', errors)
                    }
                  />
                );
              } else {
                return null;
              }
            })()}
          </FormControl>

          <Button
            mt={4}
            colorScheme="brand"
            type="submit"
            width={'100px'}
            isLoading={loading || updateLoading}
            size={'sm'}
          >
            {successCriteriaId ? 'Update' : 'Create'}
          </Button>
          <Divider mt="12px" mb="12px" />
        </Stack>
      </form>
    </VStack>
  );
};

const NewMeasurement = (props: {
  goal: GoalWithDetails;
  existingForm?: Partial<GoalMeasurementForm>;
  successCriteriaId?: string;
  onBack: () => void;
  onClose: () => void;
}) => {
  const { onBack, onClose, goal } = props;
  return (
    <>
      <DrawerHeader>
        <Header showBackButton={true} onBack={onBack} onClose={onClose}>
          <Text>Create New Measurement</Text>
        </Header>
      </DrawerHeader>
      <DrawerBody>
        <NewMeasurementForm goal={goal} onBack={onBack} />
      </DrawerBody>
    </>
  );
};

export default NewMeasurement;
