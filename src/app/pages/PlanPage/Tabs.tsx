import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { GoalWithDetails, SuccessCriteriaType } from 'types';
import SuccessCriteriaTab from './SuccessCriteriaTab';

const TabsComponent = (props: {
  goal: GoalWithDetails;
  onCreateNew: (successCriteriaType: SuccessCriteriaType) => void;
}) => {
  const { goal, onCreateNew } = props;

  return (
    <Tabs isLazy size={'sm'} colorScheme={'brand'}>
      <TabList>
        <Tab>Success Criteria</Tab>
        <Tab>Details</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <SuccessCriteriaTab goal={goal} onCreateNew={onCreateNew} />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
