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
import SuccessCriteriaTrackingIcon from 'app/components/Goals/SuccessCriteritaTrackingIcon';
import SuccessCriteriaIcon from 'app/components/Goals/SuccessCriteriaIcon';

type Props = {
  successCriteria: {
    endDate: Date;
  };
  formatDate: (date: Date) => string;
};

const DueDate: React.FC<Props> = props => {
  const formattedDate = props.formatDate(props.successCriteria.endDate);
  return <div>{formattedDate}</div>;
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
                          <DueDate
                            successCriteria={{ endDate: new Date() }}
                            formatDate={date => date.toLocaleDateString()}
                          />
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
