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
} from '@chakra-ui/react';
import TrackStatus from 'app/components/TrackStatus';
import ProgressSlider from 'app/components/ProgressSlider';
import { formatDate } from 'app/lib/utilities';
import { completionFormatted } from 'app/lib/utilities';

const ListSuccessCriterias = (props: {
  successCriterias: SuccessCriteria[];
  onSuccessCriteriaSelect: (id: string) => void;
}) => {
  const { successCriterias } = props;

  return (
    <VStack w={'100%'} spacing={4}>
      {successCriterias.map(successCriteria => {
        const completion = completionFormatted(successCriteria.completion || 0);
        return (
          <Card
            key={successCriteria.id}
            w={'100%'}
            variant={'outline'}
            onClick={() => props.onSuccessCriteriaSelect(successCriteria.id)}
          >
            <CardBody>
              <VStack alignItems={'flex-start'} spacing={4}>
                <Heading size="sm">{successCriteria.name}</Heading>
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
                      size="xs"
                      colorScheme={'gray'}
                    />
                    <Text fontSize={'sm'}>{successCriteria.owner!.name}</Text>
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
            </CardBody>
          </Card>
        );
      })}
    </VStack>
  );
};

export default ListSuccessCriterias;
