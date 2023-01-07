import React from 'react';
import { useState, useEffect } from 'react';
import { VStack, HStack, Text, Box } from '@chakra-ui/react';
import TrackStatus from 'app/components/TrackStatus';
import Pusher from 'pusher-js';
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

Pusher.logToConsole = true;
const pusher = new Pusher('YOUR_APP_KEY', { cluster: 'YOUR_CLUSTER' });

const channel = pusher.subscribe('slack-events');
channel.bind(
  'slack-events',
  (data: SuccessCriteriaWithMeasurementSlackTracking) => {
    console.log('data', data); // data will be the same as the one you sent from the server
  },
);

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

  const [data, setData] =
    useState<SuccessCriteriaWithMeasurementSlackTracking | null>(null);

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher('YOUR_APP_KEY', { cluster: 'YOUR_CLUSTER' });

    const channel = pusher.subscribe('success-criteria');
    channel.bind(
      'update',
      (newData: SuccessCriteriaWithMeasurementSlackTracking) => {
        setData(newData);
      },
    );

    return () => {
      pusher.unsubscribe('success-criteria');
    };
  }, []);

  return (
    <VStack w={'100%'} alignItems={'flex-start'} spacing={4}>
      <HStack w={'100%'}>
        <TrackStatus />
      </HStack>
      <VStack w={'100%'} alignItems={'flex-start'} pb={8}>
        <Text fontSize={'3xl'} fontWeight={'bold'}>
          {data ? completionFormatted(data.completion) : completion}%
        </Text>
        <ProgressSlider
          value={data ? completionFormatted(data.completion) : completion}
        />
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
