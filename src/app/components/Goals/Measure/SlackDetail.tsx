import React from 'react';
import Pusher from 'pusher-js';
import {
  Card,
  CardBody,
  HStack,
  VStack,
  CardHeader,
  Heading,
  Icon,
  Box,
} from '@chakra-ui/react';
import AppIcons from 'app/components/AppIcons';
import { useQuery } from '@apollo/client';
import { GET_SLACK_ACTION_LOGS } from 'app/lib/queries/measurements/Slack';
import TimeSeriesChart from 'app/components/TimeSeriesChart';
import { MeasurementTrackingSlackSettings } from 'types';

const metricsNameMap = {
  new_users: 'New Users',
  all_users: 'All Users',
  user_churn: 'Users Leaving workspace',
  new_messages: 'New Messages',
  all_messages: 'All Messages',
  invites: 'Invitations',
} as {
  [key: string]: string;
};

const SlackDetail = (props: { tracking: MeasurementTrackingSlackSettings }) => {
  const { data, loading } = useQuery(GET_SLACK_ACTION_LOGS, {
    variables: { measurementsSlackId: props.tracking.id! },
  });

  return (
    <Card w={'100%'} variant={'outline'}>
      <CardHeader>
        <HStack>
          <Icon color={'gray.600'} as={AppIcons['slack']} boxSize={6} />
          <Heading size="md">{metricsNameMap[props.tracking.metric]}</Heading>
        </HStack>
      </CardHeader>

      <CardBody>
        <VStack alignItems={'flex-start'} w={'100%'} spacing={0}>
          <Box w={'100%'} h={'300px'}>
            {!loading && (
              <TimeSeriesChart
                data={(data?.getSlackActionLogs || []).map(d => ({
                  y: d.value,
                  x: new Date(d.createdAt).getTime(),
                }))}
              />
            )}
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SlackDetail;
