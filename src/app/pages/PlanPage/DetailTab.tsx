import React from 'react';
import { VStack, HStack, Text, Box } from '@chakra-ui/react';
import TrackStatus from 'app/components/TrackStatus';
import ProgressSlider from 'app/components/ProgressSlider';
import {
  SuccessCriteria,
  ActionTrackingChecklistSettings,
  ActionTrackingMilestoneSettings,
} from 'types';
import ChecklistDetail from './Action/ChecklistDetail';
import MilestoneDetail from './Action/MilestoneDetail';
import SlackDetail from './Measure/SlackDetail';
import { completionFormatted } from 'app/lib/utilities';
import { MeasurementTrackingSlackSettings } from 'types';

export interface SuccessCriteriaWithActionChecklistTracking
  extends SuccessCriteria {
  successCriteriaType: 'action';
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
  successCriteriaType: 'action';

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

export interface SuccessCriteriaWithMeasurementSlackTracking
  extends SuccessCriteria {
  successCriteriaType: 'measurement';
  measurement: {
    id: string;
    trackingType: 'slack';
    tracking: MeasurementTrackingSlackSettings;
  };
}

export type SuccessCriteriaWithAction =
  | SuccessCriteriaWithActionChecklistTracking
  | SuccessCriteriaWithActionMilestoneTracking;

export type SuccessCriteriaWithMeasurement =
  SuccessCriteriaWithMeasurementSlackTracking;

const DetailTab = (props: {
  successCriteria: SuccessCriteriaWithAction | SuccessCriteriaWithMeasurement;
}) => {
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
          if (successCriteria.successCriteriaType === 'action') {
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
          } else if (successCriteria.successCriteriaType === 'measurement') {
            return (
              <SlackDetail tracking={successCriteria.measurement!.tracking} />
            );
          }
        })()}
      </Box>
    </VStack>
  );
};

export default DetailTab;
