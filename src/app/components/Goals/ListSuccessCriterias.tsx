import React from 'react';
import { SuccessCriteria } from 'types';
import { VStack } from '@chakra-ui/react';
import {
  Card,
  CardBody,
  Text,
  Heading,
  HStack,
  Box,
  Avatar,
  Icon,
} from '@chakra-ui/react';
import TrackStatus from 'app/components/TrackStatus';
import ProgressSlider from 'app/components/ProgressSlider';
import { formatDate } from 'app/lib/utilities';
import { completionFormatted } from 'app/lib/utilities';
import AppIcon from 'app/components/AppIcons';

const SuccessCriteriaIcon = (props: { successCriteria: SuccessCriteria }) => {
  const { successCriteria } = props;
  if (successCriteria.successCriteriaType === 'action') {
    return (
      <Icon
        as={AppIcon['action']}
        boxSize={5}
        className="ListSuccessCriteriaActionIcon"
        mb={2}
      />
    );
  } else {
    return (
      <Icon
        as={AppIcon['measurement']}
        boxSize={5}
        className="ListSuccessCriteriaIcon"
        mb={2}
      />
    );
  }
};

export const SuccessCriteriaTrackingIcon = (props: {
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

const ListSuccessCriterias = (props: {
  successCriterias: SuccessCriteria[];
  onSuccessCriteriaSelect: (id: string) => void;
}) => {
  const { successCriterias } = props;
  return (
    <VStack w={'100%'} spacing={4}>
      {[...successCriterias]
        .sort((a, b) => ((a?.createdAt || 0) > (b?.createdAt || 0) ? -1 : 1))
        .map(successCriteria => {
          const completion = completionFormatted(
            successCriteria.completion || 0,
          );
          return (
            <Card
              key={successCriteria.id}
              w={'100%'}
              variant={'outline'}
              boxShadow={'1px 3px 10px 0px var(--chakra-colors-gray-100)'}
            >
              <CardBody>
                <VStack alignItems={'flex-start'} spacing={0}>
                  <HStack
                    w={'100%'}
                    _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                    alignItems={'flex-start'}
                    spacing={4}
                    onClick={() =>
                      props.onSuccessCriteriaSelect(successCriteria.id)
                    }
                  >
                    <SuccessCriteriaIcon successCriteria={successCriteria} />
                    <Heading size="sm">{successCriteria.name}</Heading>
                    <Box marginLeft={'auto !important'}>
                      <SuccessCriteriaTrackingIcon
                        successCriteria={successCriteria}
                      />
                    </Box>
                  </HStack>
                  <VStack spacing={4} w={'100%'}>
                    <HStack alignItems={'flex-end'} w={'100%'}>
                      <Text>{completion}%</Text>
                      <Box marginLeft={'auto !important'}>
                        <TrackStatus />
                      </Box>
                    </HStack>
                    <ProgressSlider value={completion} size={'xs'} />
                    <HStack w={'100%'}>
                      <HStack>
                        <Avatar
                          name={successCriteria.owner!.name}
                          src={successCriteria.owner!.profilePic}
                          size="xs"
                          referrerPolicy={'no-referrer'}
                        />
                        <Text fontSize={'sm'}>
                          {successCriteria.owner!.name}
                        </Text>
                      </HStack>
                      <HStack
                        ml={'auto !important'}
                        spacing={2}
                        alignItems={'flex-end'}
                      >
                        <Text fontSize={'xs'} color={'gray.500'}>
                          Due on
                        </Text>{' '}
                        <Text fontSize={'sm'}>
                          {formatDate(successCriteria.endDate)}
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          );
        })}
    </VStack>
  );
};

export default ListSuccessCriterias;
