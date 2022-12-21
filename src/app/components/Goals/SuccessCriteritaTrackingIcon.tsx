import React from 'react';
import { HStack, Icon, Text } from '@chakra-ui/react';
import AppIcon from 'app/components/AppIcons';
import { SuccessCriteria } from 'types';

const SuccessCriteriaTrackingIcon = (props: {
  successCriteria: SuccessCriteria;
}) => {
  const { successCriteria } = props;
  if (successCriteria.successCriteriaType === 'action') {
    if (successCriteria.action?.trackingType === 'checklist') {
      return (
        <HStack alignItems={'flex-start'} spacing={1}>
          <Icon
            as={AppIcon['checklist']}
            boxSize={4}
            className="ListSuccessCriteriaActionIcon"
          />
          <Text fontSize={'xs'}>Checklist</Text>
        </HStack>
      );
    } else {
      return (
        <HStack alignItems={'flex-start'} spacing={1}>
          <Icon
            as={AppIcon['milestone']}
            boxSize={4}
            className="ListSuccessCriteriaActionIcon"
          />
          <Text fontSize={'xs'}>Milestone</Text>
        </HStack>
      );
    }
  } else {
    return (
      <HStack alignItems={'flex-start'} spacing={1}>
        <Icon
          as={AppIcon['slack']}
          boxSize={4}
          className="ListSuccessCriteriaActionIcon"
        />
        <Text fontSize={'xs'}>Slack</Text>
      </HStack>
    );
  }
};

export default SuccessCriteriaTrackingIcon;
