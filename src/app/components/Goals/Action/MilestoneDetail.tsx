import React from 'react';
import { ActionTrackingMilestoneSettings } from 'types';
import {
  Card,
  CardBody,
  Text,
  HStack,
  VStack,
  Checkbox,
  CardHeader,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { UPDATE_MILESTONE } from 'app/lib/mutations/Action';

const MilestoneDetail = (props: {
  checklistId: string;
  settings: ActionTrackingMilestoneSettings[];
}) => {
  const [updateMilestone, { loading }] = useMutation(UPDATE_MILESTONE);
  const { settings } = props;

  const onChange = async (itemId: string, checked: boolean) => {
    await updateMilestone({
      variables: { id: props.checklistId, itemId, checked },
    });
  };

  return (
    <Card w={'100%'} variant={'outline'}>
      <CardHeader>
        <HStack>
          <Heading size="md">Milestone items</Heading>
          {loading && <Spinner size={'sm'} />}
        </HStack>
      </CardHeader>

      <CardBody>
        <VStack alignItems={'flex-start'} w={'100%'} spacing={0}>
          {settings.map(setting => {
            return (
              <VStack
                key={setting.id}
                borderLeft={'3px solid var(--chakra-colors-brand-100)'}
                pt={'0.8rem'}
                pb={'0.8rem'}
                pl={'1.5rem'}
                w={'100%'}
                className="MilestoneTimeline"
                spacing={0}
                position={'relative'}
              >
                <HStack
                  w={'100%'}
                  spacing={4}
                  p={2}
                  borderRadius={4}
                  _hover={{ bg: 'brand.50' }}
                  onClick={e => onChange(setting.id, !setting.checked)}
                >
                  <Text fontSize={'sm'}>{setting.percent}%</Text>

                  <Text fontSize={'sm'}>{setting.item}</Text>
                  <Checkbox
                    marginLeft={'auto !important'}
                    isChecked={setting.checked}
                    onChange={e => onChange(setting.id, e.target.checked)}
                  />
                </HStack>
              </VStack>
            );
          })}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default MilestoneDetail;
