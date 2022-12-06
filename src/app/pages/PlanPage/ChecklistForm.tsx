import React from 'react';
import {
  Input,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { ActionTrackingChecklistSettings } from 'types';
import { defaultMilestoneTracking } from 'app/lib/defaults';

const ChecklistItem = (props: {
  setting: ActionTrackingChecklistSettings;
  onSettingUpdate: (setting: ActionTrackingChecklistSettings) => void;
  onRemoveSetting: () => void;
  showDeleteButton: boolean;
}) => {
  const { setting, onSettingUpdate, showDeleteButton } = props;

  const onUpdate = (attr, value) => {
    onSettingUpdate({ ...setting, [attr]: value });
  };

  return (
    <HStack w={'100%'} spacing={4}>
      <FormControl flexGrow={1}>
        <FormLabel fontSize={'sm'} mb={0}>
          Item
        </FormLabel>
        <Input
          type="text"
          size={'sm'}
          value={setting.item}
          onChange={e => onUpdate('item', e.target.value)}
        />
      </FormControl>
      <FormControl w={'250px'}>
        <FormLabel fontSize={'sm'} mb={0}>
          Due date
        </FormLabel>
        <Input
          type="date"
          size={'sm'}
          value={setting.dueDate}
          onChange={e => onUpdate('dueDate', e.target.value)}
        />
      </FormControl>
      {showDeleteButton && (
        <Button
          p={1}
          variant="ghost"
          _hover={{ bg: 'brand.50' }}
          h={'30px'}
          w={'20px !important'}
          mt={'auto !important'}
          onClick={() => props.onRemoveSetting()}
        >
          <DeleteIcon boxSize={3} />
        </Button>
      )}
    </HStack>
  );
};

const Checklist = (props: {
  settings: ActionTrackingChecklistSettings[];
  onUpdate: (settings: ActionTrackingChecklistSettings[]) => void;
  endDate: string;
}) => {
  const onAddNewChecklistItem = () => {
    props.onUpdate([
      ...props.settings,
      defaultMilestoneTracking(props.endDate),
    ]);
  };

  const onEditChecklistItem = (
    id: string,
    updatedSetting: ActionTrackingChecklistSettings,
  ) => {
    props.onUpdate(
      props.settings.map(setting => {
        if (setting.id === id) {
          return { ...setting, ...updatedSetting };
        }
        return setting;
      }),
    );
  };

  const onRemoveSetting = (id: string) => {
    props.onUpdate(props.settings.filter(setting => setting.id !== id));
  };

  return (
    <VStack alignItems={'flex-start'} mt={4} spacing={4}>
      {props.settings.map(checklistItem => (
        <ChecklistItem
          key={checklistItem.id}
          setting={checklistItem}
          onSettingUpdate={(updatedSetting: ActionTrackingChecklistSettings) =>
            onEditChecklistItem(checklistItem.id, updatedSetting)
          }
          onRemoveSetting={() => onRemoveSetting(checklistItem.id)}
          showDeleteButton={props.settings.length > 1}
        />
      ))}
      <Button size={'sm'} variant={'outline'} onClick={onAddNewChecklistItem}>
        Add new item
      </Button>
    </VStack>
  );
};

export default Checklist;
