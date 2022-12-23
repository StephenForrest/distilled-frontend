import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Avatar,
  Tooltip,
  Icon,
  TableContainer,
  Table,
  Tbody,
  Td,
  HStack,
  Text,
  Box,
  Tr,
} from '@chakra-ui/react';
import { formatDate } from 'app/lib/utilities';
import { useNavigate } from 'react-router-dom';
import AppIcons from 'app/components/AppIcons';
import { selectedDrawerConfig } from 'app/lib/cache';

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

const Goal = props => {
  const { goal } = props;
  return (
    <Tr
      _hover={{
        bg: 'brand.50',
        cursor: 'pointer',
      }}
      onClick={() => selectedDrawerConfig({ goalId: goal.id })}
    >
      <Td w={'100%'}>
        <HStack>
          <Icon color={'gray.500'} as={AppIcons['goal']} />
          <Text>{goal.title} </Text>
        </HStack>
      </Td>
      <Td>
        <HStack spacing={6}>
          <Tooltip label="Tasks">
            <HStack w={'40px'}>
              <Icon color={'gray.500'} as={AppIcons['action']} />
              <Text fontSize={'xs'}>{goal.actionsCount!}</Text>
            </HStack>
          </Tooltip>
          <Tooltip label="Measurements">
            <HStack w={'40px'}>
              <Icon color={'gray.500'} as={AppIcons['measurement']} />
              <Text fontSize={'xs'}>{goal.measurementsCount!}</Text>
            </HStack>
          </Tooltip>
        </HStack>
      </Td>
      <Td>
        <HStack marginLeft={'auto !important'}>
          <Text color={'gray.500'} fontSize={'sm'} ml={'auto'}>
            <DueDate
              successCriteria={{ endDate: new Date() }}
              formatDate={date => date.toLocaleDateString()}
            />
          </Text>

          <Avatar
            name={goal.owner.name}
            size="xs"
            src={goal.owner!.profilePic}
            referrerPolicy={'no-referrer'}
          />
        </HStack>
      </Td>
    </Tr>
  );
};

const PlanItem = props => {
  const navigate = useNavigate();
  const { plan } = props;
  return (
    <Card
      key={plan.id}
      w={'100%'}
      bg={'white'}
      variant="outline"
      boxShadow={'md'}
    >
      <CardHeader
        onClick={() => navigate(`/plan/${plan.id}`)}
        _hover={{
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        bg={'gray.100'}
        p={3}
        pl={4}
      >
        <Heading size="md">{plan.name}</Heading>
      </CardHeader>
      <CardBody>
        {(() => {
          if (!plan.recentGoals.length) {
            return <Text fontSize={'sm'}>No goals created</Text>;
          } else {
            return (
              <>
                <Heading size="sm" mb={4}>
                  Goals
                </Heading>
                <TableContainer w={'100%'}>
                  <Table variant="simple" size="sm">
                    <Tbody>
                      {(plan.recentGoals || []).map(goal => {
                        return <Goal key={goal.id} goal={goal} />;
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            );
          }
        })()}

        {plan.goalsCount > 3 && (
          <Box>
            <Text
              pl="4"
              onClick={() => navigate(`/plan/${plan.id}`)}
              mt={4}
              fontSize="sm"
              _hover={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {plan.goalsCount - 3} more
            </Text>
          </Box>
        )}
      </CardBody>
    </Card>
  );
};

export default PlanItem;
