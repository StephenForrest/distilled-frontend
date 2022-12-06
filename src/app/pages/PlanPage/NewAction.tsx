import React, { useState } from 'react';
import { GoalWithDetails, ActionTrackingType, GoalActionForm } from 'types';
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
} from '@chakra-ui/react';
import ChecklistForm from './ChecklistForm';
import { getDateNDaysFromToday, formatDateForInput } from 'app/lib/utilities';
import { defaultMilestoneTracking } from 'app/lib/defaults';
import Header from './Header';
import { CREATE_ACTION_MUTATION } from 'app/lib/mutations/Plan';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

const NewAction = (props: {
  goal: GoalWithDetails;
  onClose: () => void;
  onBack: () => void;
}) => {
  const { uuid: planUuid } = useParams();
  const { goal, onClose, onBack } = props;
  const [createActionMutation, { loading, error }] = useMutation(
    CREATE_ACTION_MUTATION,
  );

  const endDate = formatDateForInput(
    new Date(new Date(goal.expiresOn).toString()),
  );
  const [form, setForm] = useState<GoalActionForm>({
    title: '',
    description: '',
    trackingType: 'checklist',
    startDate: getDateNDaysFromToday(0),
    endDate,
    trackingSettings: [defaultMilestoneTracking(goal.expiresOn)],
  });

  const updateForm = (attr: keyof GoalActionForm, value: unknown) =>
    setForm({ ...form, [attr]: value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createActionMutation({
      variables: {
        planUuid: planUuid,
        goalId: goal.id,
        name: form.title,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        trackingSettings: { [form.trackingType]: form.trackingSettings },
      },
    });
  };

  return (
    <>
      <DrawerHeader>
        <Header showBackButton={true} onBack={onBack} onClose={onClose}>
          <Text>Create New Action</Text>
        </Header>
      </DrawerHeader>
      <DrawerBody>
        <VStack>
          <form onSubmit={onSubmit} className="full-width">
            <Stack spacing={6} w={'100%'}>
              <FormControl>
                <FormLabel fontSize={'small'}>Name</FormLabel>
                <Input
                  type="text"
                  value={form.title}
                  onChange={e => updateForm('title', e.target.value)}
                  maxWidth={'300px'}
                  size={'sm'}
                />
              </FormControl>
              <FormControl>
                <HStack spacing="24px">
                  <VStack spacing={0} alignItems={'flex-start'}>
                    <FormLabel fontSize={'small'}>Start date</FormLabel>
                    <Input
                      type="date"
                      size={'sm'}
                      value={form.startDate}
                      onChange={e => updateForm('startDate', e.target.value)}
                    />
                  </VStack>
                  <VStack spacing={0} alignItems={'flex-start'}>
                    <FormLabel fontSize={'small'}>End date</FormLabel>
                    <Input
                      type="date"
                      size={'sm'}
                      value={form.endDate}
                      onChange={e => updateForm('endDate', e.target.value)}
                    />
                  </VStack>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={'small'}>Description</FormLabel>
                <Textarea
                  value={form.description}
                  onChange={e => updateForm('description', e.target.value)}
                  size={'sm'}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={'small'}>Tracking type</FormLabel>
                <Select
                  size={'sm'}
                  width={'300px'}
                  value={form.trackingType}
                  onChange={e =>
                    updateForm(
                      'trackingType',
                      e.target.value as ActionTrackingType,
                    )
                  }
                >
                  <option value="milestone">Milestone</option>
                  <option value="checklist">Checklist</option>
                </Select>
                {(() => {
                  if (form.trackingType === 'milestone') {
                    return null;
                  } else if (form.trackingType === 'checklist') {
                    return (
                      <ChecklistForm
                        settings={form.trackingSettings}
                        onUpdate={settings =>
                          updateForm('trackingSettings', settings)
                        }
                        endDate={goal.expiresOn}
                      />
                    );
                  } else {
                    return null;
                  }
                })()}
              </FormControl>

              {/* {error && <Text as="i">{error.message}</Text>} */}
              <Button
                mt={4}
                colorScheme="brand"
                type="submit"
                width={'100px'}
                isLoading={false}
                size={'sm'}
              >
                Create
              </Button>
              <Divider mt="12px" mb="12px" />
            </Stack>
          </form>
        </VStack>
      </DrawerBody>
    </>
  );
};

export default NewAction;
