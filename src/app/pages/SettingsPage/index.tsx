import * as React from 'react';
import PageHeader from 'app/components/PageHeader';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
} from '@chakra-ui/react';
import UserSettings from './UserSettings';
import WorkspaceSettings from './WorkspaceSettings';

export function Settings() {
  return (
    <VStack w={'100%'} alignItems={'left'} p={8}>
      <PageHeader text="Settings" />
      <Tabs size="sm" isLazy>
        <TabList>
          <Tab>User Settings</Tab>
          <Tab>Workspace settings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <UserSettings />
          </TabPanel>
          <TabPanel>
            <WorkspaceSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
