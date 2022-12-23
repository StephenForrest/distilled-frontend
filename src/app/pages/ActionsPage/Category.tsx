import React from 'react';
import {
  Box,
  Text,
  Card,
  CardBody,
  VStack,
  HStack,
  Heading,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SuccessCriteriaTrackingIcon from 'app/components/Goals/SuccessCriteritaTrackingIcon';
import TrackStatus from 'app/components/TrackStatus';
import ProgressSlider from 'app/components/ProgressSlider';
import { completionFormatted, formatDate } from 'app/lib/utilities';
import { selectedDrawerConfig } from 'app/lib/cache';

const categoriesTitle = {
  todo: 'To do',
  ongoing: 'On going',
  done: 'Done',
  backlog: 'Backlog',
};

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

const CategoryItem = props => {
  const { action: successCriteria, index } = props;
  const completion = completionFormatted(successCriteria.completion || 0);
  return (
    <Draggable draggableId={successCriteria.id} index={index}>
      {provided => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          w={'100%'}
        >
          <Card bg={'white'} w={'100%'}>
            <CardBody>
              <VStack alignItems={'flex-start'} spacing={0}>
                <HStack
                  w={'100%'}
                  _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                  alignItems={'flex-start'}
                  spacing={4}
                  onClick={() =>
                    selectedDrawerConfig({
                      goalId: successCriteria.goalId,
                      successCriteriaId: successCriteria.id,
                    })
                  }
                >
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
                      <DueDate
                        successCriteria={{ endDate: new Date() }}
                        formatDate={date => date.toLocaleDateString()}
                      />
                    </HStack>
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};

const Category = props => {
  const { actions } = props;
  return (
    <VStack
      bg={'gray.100'}
      h={'inherit'}
      w={'100%'}
      minWidth={'280px'}
      borderRadius={8}
      overflow={'hidden'}
    >
      <Box bg={'blue.700'} w={'100%'} p={2} color={'gray.50'}>
        <Center>
          <Text fontSize={'sm'} fontWeight={'semibold'}>
            {categoriesTitle[props.category]}
          </Text>
        </Center>
      </Box>
      <Droppable droppableId={props.category}>
        {provided => (
          <VStack
            w={'100%'}
            h={'calc(100%)'}
            overflow={'auto'}
            p={4}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {(actions || []).map((a, index) => {
              return <CategoryItem key={a.id} action={a} index={index} />;
            })}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </VStack>
  );
};

export default Category;
