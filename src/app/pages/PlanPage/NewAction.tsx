import React, { useState } from 'react';
import {
  GoalWithDetails,
  ActionTrackingType,
  GoalActionForm,
  GoalActionFormErrors,
} from 'types';
import { DrawerHeader, DrawerBody } from '@chakra-ui/react';
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
  Text,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import ChecklistForm from './ActionForms/ChecklistForm';
import MilestoneForm from './ActionForms/MilestoneForm';
import {
  getDateNDaysFromToday,
  formatDateForInput,
  convertDateToUTC,
} from 'app/lib/utilities';
import {
  defaultChecklistTracking,
  defaultMilestoneTracking,
} from 'app/lib/defaults';
import Header from './Header';
import {
  CREATE_ACTION_MUTATION,
  UPDATE_SUCCESS_CRITERIA_MUTATION,
} from 'app/lib/mutations/Plan';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

export const NewActionForm = (props: {
  goal: GoalWithDetails;
  existingForm?: Partial<GoalActionForm>;
  successCriteriaId?: string;
  onBack: () => void;
}) => {
  const { uuid: planUuid } = useParams();
  const { goal, onBack, successCriteriaId, existingForm } = props;
  const [createActionMutation, { loading }] = useMutation<{
    createAction: { action: unknown; errors: GoalActionFormErrors };
  }>(CREATE_ACTION_MUTATION, {
    refetchQueries: ['getPlan', 'getPlans', 'getGoal'],
  });

  const [updateSuccessCriteriaMutation, { loading: updateLoading }] =
    useMutation<{
      updateSuccessCriteria: {
        successCriteria: unknown;
        errors: GoalActionFormErrors;
      };
    }>(UPDATE_SUCCESS_CRITERIA_MUTATION, {
      refetchQueries: ['getPlan', 'getPlans', 'getGoal'],
    });

  const endDate = formatDateForInput(
    new Date(new Date(goal.expiresOn).toString()),
  );
  const [form, setForm] = useState<GoalActionForm>({
    name: existingForm?.name ?? '',
    description: existingForm?.description || '',
    trackingType: existingForm?.trackingType || 'checklist',
    startDate: existingForm?.startDate || getDateNDaysFromToday(0),
    endDate: existingForm?.endDate || endDate,
    trackingSettings: existingForm?.trackingSettings || [
      defaultChecklistTracking(goal.expiresOn),
    ],
  } as GoalActionForm);
  const [formErrors, setFormErrors] = useState<GoalActionFormErrors>({});

  const updateForm = (attr: keyof GoalActionForm, value: unknown) => {
    setForm({ ...form, [attr]: value });
    if (attr !== 'trackingSettings') {
      updateErrors(attr, undefined);
    }
  };

  const updateTrackingType = (trackingType: ActionTrackingType) => {
    let trackingSettings;
    if (trackingType === 'checklist') {
      trackingSettings = [defaultChecklistTracking(goal.expiresOn)];
    } else {
      trackingSettings = defaultMilestoneTracking(goal.expiresOn);
    }
    setForm({ ...form, trackingSettings, trackingType });
  };

  const updateErrors = (attr: keyof GoalActionForm, value: unknown) => {
    setFormErrors({ ...formErrors, [attr]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variables = {
      planUuid: planUuid,
      goalId: goal.id,
      name: form.name,
      description: form.description,
      startDate: convertDateToUTC(form.startDate),
      endDate: convertDateToUTC(form.endDate),
      trackingSettings: { [form.trackingType]: form.trackingSettings },
    };

    if (!successCriteriaId) {
      const result = await createActionMutation({
        variables,
      });
      if (result?.data?.createAction?.errors as GoalActionFormErrors) {
        setFormErrors(result.data?.createAction?.errors || {});
      } else {
        onBack();
      }
    } else {
      const result = await updateSuccessCriteriaMutation({
        variables: { ...variables, successCriteriaId },
      });
      if (result?.data?.updateSuccessCriteria?.errors as GoalActionFormErrors) {
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
          <FormControl isInvalid={!!formErrors.name}>
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
              <FormControl isInvalid={!!formErrors.startDate}>
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
              <FormControl isInvalid={!!formErrors.endDate}>
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
                updateTrackingType(e.target.value as ActionTrackingType)
              }
            >
              <option value="milestone">Milestone</option>
              <option value="checklist">Checklist</option>
            </Select>
            {(() => {
              if (form.trackingType === 'milestone') {
                return (
                  <MilestoneForm
                    settings={form.trackingSettings}
                    errors={formErrors.trackingSettings}
                    onUpdate={settings =>
                      updateForm('trackingSettings', settings)
                    }
                    onUpdateErrors={errors =>
                      updateErrors('trackingSettings', errors)
                    }
                    endDate={goal.expiresOn}
                  />
                );
              } else if (form.trackingType === 'checklist') {
                return (
                  <ChecklistForm
                    settings={form.trackingSettings}
                    errors={formErrors.trackingSettings}
                    onUpdate={settings =>
                      updateForm('trackingSettings', settings)
                    }
                    onUpdateErrors={errors =>
                      updateErrors('trackingSettings', errors)
                    }
                    endDate={goal.expiresOn}
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

const NewAction = (props: {
  goal: GoalWithDetails;
  onClose: () => void;
  onBack: () => void;
}) => {
  const { goal, onClose, onBack } = props;
  return (
    <>
      <DrawerHeader>
        <Header showBackButton={true} onBack={onBack} onClose={onClose}>
          <Text>Create New Action</Text>
        </Header>
      </DrawerHeader>
      <DrawerBody>
        <NewActionForm goal={goal} onBack={onBack} />
      </DrawerBody>
    </>
  );
};

export default NewAction;
