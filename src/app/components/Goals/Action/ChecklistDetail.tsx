import React, { useState } from 'react';
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
  Spinner,
} from '@chakra-ui/react';
import { formatDate } from 'app/lib/utilities';
import { UPDATE_CHECKLIST } from 'app/lib/mutations/Action';
import { useMutation } from '@apollo/client';

const ChecklistDetail = (props: {
  checklistId: string;
  settings: ActionTrackingChecklistSettings[];
}) => {
  const [updateChecklist, { loading }] = useMutation(UPDATE_CHECKLIST);
  const [disabled, setDisabled] = useState<{ [id: string]: boolean }>({});
  const { settings } = props;

  const onChange = async (itemId: string, checked: boolean) => {
    setDisabled({ [itemId]: true });
    await updateChecklist({
      variables: { id: props.checklistId, itemId, checked },
    });
    setDisabled({ [itemId]: false });
  };

  return (
    <Card w={'100%'} variant={'outline'}>
      <CardHeader>
        <HStack>
          <Heading size="md">Checklist items</Heading>
          {loading && <Spinner size={'sm'} />}
        </HStack>
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
                onClick={e => onChange(setting.id, !setting.checked)}
                pointerEvents={disabled[setting.id] ? 'none' : 'auto'}
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
