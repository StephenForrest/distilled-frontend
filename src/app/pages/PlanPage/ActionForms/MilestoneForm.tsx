import React from 'react';
import {
  Input,
  VStack,
  HStack,
  Button,
  FormControl,
  FormErrorMessage,
  Box,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { ActionTrackingMilestoneSettings, GoalActionFormErrors } from 'types';
import { addNewMilestoneItem } from 'app/lib/defaults';
import { AddIcon } from '@chakra-ui/icons';
import { convertDateToUTC, formatDateForInput } from 'app/lib/utilities';

const MilestoneItem = (props: {
  setting: ActionTrackingMilestoneSettings;
  error: { [key: string]: string };
  onSettingUpdate: (setting: ActionTrackingMilestoneSettings) => void;
  onRemoveSetting: () => void;
  onAddNewMilestoneItem: () => void;
  showDeleteButton: boolean;
}) => {
  const { setting, onSettingUpdate, showDeleteButton, error } = props;

  const onUpdate = (attr, value) => {
    onSettingUpdate({ ...setting, [attr]: value });
  };

  return (
    <VStack
      borderLeft={'3px solid var(--chakra-colors-brand-100)'}
      pt={'1.2rem'}
      pb={'1.2rem'}
      pl={'1.5rem'}
      w={'100%'}
      className="MilestoneTimeline"
      spacing={0}
      position={'relative'}
    >
      <HStack w={'100%'} spacing={4} alignItems={'flex-start'}>
        <FormControl width={'150px'} isInvalid={!!error.percent}>
          <InputGroup size="sm">
            <Input
              type="number"
              value={setting.percent}
              onChange={e => onUpdate('percent', e.target.value)}
            />
            <InputRightElement width={'30px'} fontSize={'xs'}>
              %
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage fontSize={'xs'}>{error.item}</FormErrorMessage>
        </FormControl>
        <FormControl flexGrow={1} isInvalid={!!error.item}>
          <Input
            type="text"
            size={'sm'}
            value={setting.item}
            onChange={e => onUpdate('item', e.target.value)}
          />
          <FormErrorMessage fontSize={'xs'}>{error.item}</FormErrorMessage>
        </FormControl>
        <Box w={'100px'}>
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
        </Box>
      </HStack>
      {props.setting.percent !== 100 && (
        <Button
          variant="ghost"
          colorScheme={'brand'}
          position={'absolute'}
          bottom={'-10px'}
          className="MilestoneTimelineAdd"
          zIndex={10}
          onClick={props.onAddNewMilestoneItem}
          size={'xs'}
        >
          <AddIcon boxSize={3} />
        </Button>
      )}
    </VStack>
  );
};

const MilestoneForm = (props: {
  settings: ActionTrackingMilestoneSettings[];
  errors: GoalActionFormErrors['trackingSettings'];
  onUpdate: (settings: ActionTrackingMilestoneSettings[]) => void;
  onUpdateErrors: (errors: GoalActionFormErrors['trackingSettings']) => void;
  endDate: string;
}) => {
  const onAddNewMilestoneItem = (
    percent: number,
    percentNext: number | undefined,
  ) => {
    const percentMid = Math.ceil(percent + (percentNext || 100) / 2);
    props.onUpdate(
      [...props.settings, addNewMilestoneItem(props.endDate, percentMid)].sort(
        (a, b) => (a.percent > b.percent ? 1 : -1),
      ),
    );
  };

  const onEditMilestoneItem = (
    percent: number,
    updatedSetting: ActionTrackingMilestoneSettings,
  ) => {
    props.onUpdate(
      props.settings.map(setting => {
        if (setting.percent === percent) {
          return { ...setting, ...updatedSetting };
        }
        return setting;
      }),
    );
    props.onUpdateErrors({ ...(props.errors || {}), [percent]: {} });
  };

  const onRemoveSetting = (percent: number) => {
    props.onUpdate(
      props.settings.filter(setting => setting.percent !== percent),
    );
  };

  return (
    <VStack alignItems={'flex-start'} mt={4} spacing={0} pl={2}>
      {props.settings.map((milestoneItem, index) => (
        <MilestoneItem
          error={props.errors ? props.errors[milestoneItem.percent] || {} : {}}
          key={milestoneItem.percent}
          setting={milestoneItem}
          onSettingUpdate={(updatedSetting: ActionTrackingMilestoneSettings) =>
            onEditMilestoneItem(milestoneItem.percent, updatedSetting)
          }
          onRemoveSetting={() => onRemoveSetting(milestoneItem.percent)}
          showDeleteButton={
            milestoneItem.percent !== 0 && milestoneItem.percent !== 100
          }
          onAddNewMilestoneItem={() =>
            onAddNewMilestoneItem(
              props.settings[index]?.percent,
              props.settings[index + 1]?.percent,
            )
          }
        />
      ))}
    </VStack>
  );
};

export default MilestoneForm;
