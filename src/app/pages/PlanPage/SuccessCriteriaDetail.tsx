import React, { useState } from 'react';
import Header from './Header';
import { DrawerHeader, DrawerBody, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import DetailTab from './Action/DetailTab';
import { useApolloClient } from '@apollo/client';
import { SUCCESS_CRITERIA_FRAGMENT } from 'app/lib/fragments/Plan';
import { GoalWithDetails } from 'types';
import { NewActionForm } from './Action/NewAction';
import { NewMeasurementForm } from './Measure/NewMeasurement';
import { formatDateForInput, omit } from 'app/lib/utilities';

const SuccessCriteriaDetail = (props: {
  successCriteriaId: string;
  onClose: () => void;
  onBack: () => void;
  goal: GoalWithDetails;
}) => {
  const [screen, setScreen] = useState<'details' | 'edit'>('details');
  const client = useApolloClient();
  const { onBack, onClose, successCriteriaId, goal } = props;
  const data = client.readFragment({
    id: `SuccessCriteria:${successCriteriaId}`,
    fragment: SUCCESS_CRITERIA_FRAGMENT,
  });

  const onBackProp = () => {
    screen === 'edit' ? setScreen('details') : onBack();
  };

  console.log(
    data,
    'data',
    screen,
    screen === 'edit' && data.successCriteriaType === 'measurement',
  );

  return (
    <>
      <DrawerHeader>
        <Header
          showBackButton={true}
          onBack={onBackProp}
          onClose={onClose}
          showEditButton={screen === 'details'}
          onEdit={() => setScreen('edit')}
        >
          <Text>{data.name}</Text>
        </Header>
      </DrawerHeader>
      <DrawerBody>
        {screen === 'details' && (
          <Tabs isLazy size={'sm'} colorScheme={'brand'}>
            <TabList>
              <Tab>Detail</Tab>
              <Tab>Updates</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <DetailTab successCriteria={data} />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
        {screen === 'edit' && data.successCriteriaType === 'action' && (
          <NewActionForm
            goal={goal}
            onBack={onBackProp}
            successCriteriaId={successCriteriaId}
            existingForm={{
              name: data!.name,
              description: data!.description,
              trackingSettings:
                data!.action.tracking.settings[data!.action.trackingType],
              startDate: formatDateForInput(new Date(data!.startDate)),
              endDate: formatDateForInput(new Date(data!.endDate)),
              trackingType: data!.action.trackingType,
            }}
          />
        )}
        {screen === 'edit' && data.successCriteriaType === 'measurement' && (
          <NewMeasurementForm
            goal={goal}
            onBack={onBackProp}
            successCriteriaId={successCriteriaId}
            existingForm={{
              name: data!.name,
              description: data!.description,
              trackingSettings: omit('__typename', data!.measurement.tracking),
              startDate: formatDateForInput(new Date(data!.startDate)),
              endDate: formatDateForInput(new Date(data!.endDate)),
              trackingType: data!.measurement.trackingType,
            }}
          />
        )}
      </DrawerBody>
    </>
  );
};

export default SuccessCriteriaDetail;
