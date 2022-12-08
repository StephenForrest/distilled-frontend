import React from 'react';
import { ActionTrackingChecklistSettings } from 'types';
import {
  Card,
  CardBody,
  Text,
  HStack,
  VStack,
  Divider,
  Checkbox,
  CardHeader,
  Heading,
} from '@chakra-ui/react';
import { formatDate } from 'app/lib/utilities';
import { UPDATE_CHECKLIST } from 'app/lib/mutations/Checklist';
import { useMutation } from '@apollo/client';

const ChecklistDetail = (props: {
  checklistId: string;
  settings: ActionTrackingChecklistSettings[];
}) => {
  const [updateChecklist, { loading }] = useMutation(UPDATE_CHECKLIST);
  const { settings } = props;

  const onChange = async (itemId: string, checked: boolean) => {
    const data = await updateChecklist({
      variables: { id: props.checklistId, itemId, checked },
    });
    console.log(data);
  };

  return (
    <Card w={'100%'} variant={'outline'}>
      <CardHeader>
        <Heading size="md">Checklist items</Heading>
      </CardHeader>

      <CardBody>
        <VStack
          alignItems={'flex-start'}
          w={'100%'}
          divider={<Divider orientation={'horizontal'} />}
        >
          {settings.map(setting => {
            return (
              <HStack
                key={setting.id}
                w={'100%'}
                _hover={{ bg: 'gray.50' }}
                p={2}
                spacing={4}
                borderRadius={4}
              >
                <Checkbox
                  isChecked={setting.checked}
                  onChange={e => onChange(setting.id, e.target.checked)}
                />
                <Text fontSize={'sm'}>{setting.item}</Text>
                <HStack
                  ml={'auto !important'}
                  spacing={2}
                  alignItems={'flex-end'}
                >
                  <Text fontSize={'xs'} color={'gray.500'}>
                    Due on
                  </Text>{' '}
                  <Text fontSize={'sm'}>{formatDate(setting.dueDate)}</Text>
                </HStack>
              </HStack>
            );
          })}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ChecklistDetail;
