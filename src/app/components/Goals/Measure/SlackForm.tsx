import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_INTEGRATIONS_BY_TYPE,
  GET_INTEGRATION_DETAILS,
} from 'app/lib/queries/Integration';
import {
  Center,
  VStack,
  Text,
  HStack,
  FormControl,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  FormLabel,
  Select,
  Input,
} from '@chakra-ui/react';
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import useSlackOauth from 'app/lib/hooks/oauth/useSlackOauth';
import { Select as ChakraSelect } from 'chakra-react-select';
import {
  MeasurementTrackingSlackSettings,
  GoalMeasurementFormErrors,
  SlackMetricType,
} from 'types';
import { client } from 'index';
import Loader from 'app/components/Loader';

interface SlackChannelProperties {
  id: string;
  name: string;
}

const SlackIntegration = (props: {
  settings: Partial<MeasurementTrackingSlackSettings>;
  errors: GoalMeasurementFormErrors['trackingSettings'];
  onUpdate: (settings: Partial<MeasurementTrackingSlackSettings>) => void;
  onUpdateErrors: (
    errors: GoalMeasurementFormErrors['trackingSettings'],
  ) => void;
}) => {
  const {
    settings,
    onUpdate: onMeasurementUpdate,
    errors,
    onUpdateErrors,
  } = props;
  const { onClick } = useSlackOauth();
  const { data, loading } = useQuery(GET_INTEGRATIONS_BY_TYPE, {
    variables: { integrationType: 'slack' },
  });
  const [channelSuggestions, setChannelSuggestions] = useState<
    SlackChannelProperties[]
  >([]);
  const [channelsLoading, setChannelsLoading] = useState<boolean>(false);

  const onUpdate = useCallback(
    (updatedSettings: Partial<MeasurementTrackingSlackSettings>) => {
      onMeasurementUpdate(updatedSettings);
      onUpdateErrors({});
    },
    [onMeasurementUpdate, onUpdateErrors],
  );

  const populateChannels = useCallback(async integrationId => {
    if (!integrationId) {
      return;
    }
    setChannelsLoading(true);
    setChannelSuggestions([]);
    const result = await client.query({
      query: GET_INTEGRATION_DETAILS,
      variables: {
        id: integrationId,
      },
    });
    setChannelSuggestions(result.data.getIntegration.settings.channels);
    setChannelsLoading(false);
  }, []);

  const selectIntegration = useCallback(
    async integration => {
      onUpdate({
        ...settings,
        integrationId: integration.id,
        metric: 'new_users',
      });
    },
    [onUpdate, settings],
  );

  useEffect(() => {
    populateChannels(settings.integrationId);
  }, [settings.integrationId, populateChannels]);

  useEffect(() => {
    if (data?.getIntegrationsByType[0] && !settings.integrationId) {
      selectIntegration(data.getIntegrationsByType[0]);
    }
  }, [data?.getIntegrationsByType, settings.integrationId, selectIntegration]);

  if (loading) {
    return (
      <Center>
        <Loader size={2} />
      </Center>
    );
  }

  if (!data.getIntegrationsByType || !data.getIntegrationsByType.length) {
    return (
      <VStack alignItems={'flex-start'} spacing={6}>
        <Text mt={8} fontSize={'sm'}>
          You haven't add any slack integrations yet.
        </Text>
        <VStack alignItems={'flex-start'} spacing={2}>
          <Button size={'sm'} onClick={onClick}>
            Connect to slack
          </Button>
          {errors?.integrationId && (
            <Text fontSize={'sm'} mt={4} color={'red.400'}>
              {errors.integrationId}
            </Text>
          )}
        </VStack>
      </VStack>
    );
  }

  const selectedIntegration = (data.getIntegrationsByType || []).find(
    i => i.id === settings.integrationId,
  );

  return (
    <VStack alignItems={'flex-start'} mt={4} spacing={4}>
      <FormControl isRequired>
        <FormLabel fontSize={'small'}>Choose slack integration</FormLabel>
        <Menu>
          <MenuButton
            as={Button}
            variant={'outline'}
            size={'sm'}
            borderRadius={'sm'}
            width={'300px'}
            textAlign="left"
            fontWeight={'normal'}
            rightIcon={<ChevronDownIcon boxSize={5} marginRight={0} />}
            pl={2}
          >
            <Text>{selectedIntegration?.name}</Text>
          </MenuButton>
          <MenuList w={'300px'}>
            {data.getIntegrationsByType.map(d => {
              return (
                <MenuItem key={d.id} onClick={() => selectIntegration(d)}>
                  {d.name}
                </MenuItem>
              );
            })}
            <MenuItem onClick={onClick}>
              <AddIcon boxSize={3} mr={2} />
              Create new Slack Integration
            </MenuItem>
          </MenuList>
        </Menu>
      </FormControl>
      <HStack w={'100%'} alignItems={'flex-start'}>
        <FormControl isRequired isInvalid={!!errors?.metric}>
          <FormLabel fontSize={'small'}>What do you want to track?</FormLabel>
          <Select
            size={'sm'}
            value={settings.metric}
            onChange={e => {
              onUpdate({
                ...settings,
                metric: e.target.value as SlackMetricType,
              });
            }}
          >
            <optgroup label="Users">
              <option value="new_users">New Users</option>
              <option value="all_users">Total Users</option>
              <option value="user_churn">Leaving users</option>
            </optgroup>
            <optgroup label="Messages (Public channels)">
              <option value="new_messages">New Messages</option>
              <option value="all_messages">Total messages</option>
            </optgroup>
            <optgroup label="Invites">
              <option value="new_invites">New invites</option>
              <option value="all_invites">Total invites</option>
            </optgroup>
          </Select>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors?.channelFilters}>
          <FormLabel fontSize={'small'}>Filter by channels</FormLabel>
          <ChakraSelect
            size="sm"
            isLoading={channelsLoading}
            isMulti
            getOptionLabel={(channel: SlackChannelProperties) =>
              `#${channel.name}`
            }
            getOptionValue={(channel: SlackChannelProperties) =>
              `${channel.id}`
            }
            value={channelSuggestions.filter((cs: SlackChannelProperties) => {
              return (settings.channelFilters || []).indexOf(cs.id) > -1;
            })}
            options={channelSuggestions}
            onChange={option => {
              onUpdate({
                ...settings,
                channelFilters: option.map(cs => cs.id),
              });
            }}
          />
        </FormControl>
      </HStack>
      <FormControl isRequired isInvalid={!!errors?.value}>
        <FormLabel fontSize={'small'}>Target value</FormLabel>
        <Input
          type="number"
          maxWidth={'300px'}
          size={'sm'}
          value={String(settings.value)}
          onChange={e => {
            onUpdate({
              ...settings,
              value: Number(e.target.value),
            });
          }}
        />
      </FormControl>
    </VStack>
  );
};

export default SlackIntegration;
