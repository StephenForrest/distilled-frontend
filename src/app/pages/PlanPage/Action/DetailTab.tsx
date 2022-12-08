import React from 'react';
import { VStack, HStack, Text, Box } from '@chakra-ui/react';
import TrackStatus from 'app/components/TrackStatus';
import ProgressSlider from 'app/components/ProgressSlider';
import {
  SuccessCriteria,
  ActionTrackingChecklistSettings,
  ActionTrackingMilestoneSettings,
} from 'types';
import ChecklistDetail from './ChecklistDetail';
import MilestoneDetail from './MilestoneDetail';
import { completionFormatted } from 'app/lib/utilities';
export interface SuccessCriteriaWithActionChecklistTracking
  extends SuccessCriteria {
  action: {
    id: string;
    trackingType: 'checklist';
    tracking: {
      id: string;
      settings: {
        checklist: ActionTrackingChecklistSettings[];
      };
    };
  };
}

export interface SuccessCriteriaWithActionMilestoneTracking
  extends SuccessCriteria {
  action: {
    id: string;
    trackingType: 'milestone';
    tracking: {
      id: string;
      settings: {
        milestone: ActionTrackingMilestoneSettings[];
      };
    };
  };
}

export type SuccessCriteriaWithAction =
  | SuccessCriteriaWithActionChecklistTracking
  | SuccessCriteriaWithActionMilestoneTracking;

const DetailTab = (props: { successCriteria: SuccessCriteriaWithAction }) => {
  const { successCriteria } = props;
  const completion = completionFormatted(successCriteria.completion || 0);
  return (
    <VStack w={'100%'} alignItems={'flex-start'} spacing={4}>
      <HStack w={'100%'}>
        <TrackStatus />
      </HStack>
      <VStack w={'100%'} alignItems={'flex-start'} pb={8}>
        <Text fontSize={'3xl'} fontWeight={'bold'}>
          {completion}%
        </Text>
        <ProgressSlider value={completion} />
      </VStack>
      <Box w={'100%'}>
        {(() => {
          if (successCriteria.action?.trackingType === 'checklist') {
            return (
              <ChecklistDetail
                checklistId={successCriteria.action.tracking.id}
                settings={successCriteria.action.tracking.settings.checklist}
              />
            );
          } else if (successCriteria.action?.trackingType === 'milestone') {
            return (
              <MilestoneDetail
                checklistId={successCriteria.action.tracking.id}
                settings={successCriteria.action.tracking.settings.milestone}
              />
            );
          }
        })()}
      </Box>
    </VStack>
  );
};

export default DetailTab;
