import React, { useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Text,
  HStack,
  Icon,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GoalWithDetails, SuccessCriteriaType } from 'types';
import { GET_GOAL } from 'app/lib/queries/Plan';
import Tabs from './Tabs';
import NewAction from 'app/components/Goals/Action/NewAction';
import NewMeasurement from './Measure/NewMeasurement';
import Header from './Header';
import SuccessCriteriaDetail from './SuccessCriteriaDetail';
import Loader from 'app/components/Loader';
import AppIcons from 'app/components/AppIcons';
import { selectedDrawerConfig } from 'app/lib/cache';
import { useReactiveVar } from '@apollo/client';
import DeleteGoalDialog from './DeleteGoalDialogue';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import EditableGoalName from './EditableGoalName';

export type Screens = 'tabs' | 'new-measure' | 'new-action' | 'action-detail';

const GoalDrawer = (props: {
  goalId: number | undefined;
  onClose: () => void;
}) => {
  const [editGoalName, setEditGoalName] = useState<boolean>(false);
  const { isOpen, onClose: onAlertClose, onOpen } = useDisclosure();
  const [screen, setScreen] = useState<Screens>('tabs');
  const drawerConfig = useReactiveVar(selectedDrawerConfig);

  const selectedSuccessCriteria = drawerConfig.successCriteriaId;
  const setSelectedSuccessCriteria = (id: string | undefined) =>
    selectedDrawerConfig({ ...drawerConfig, successCriteriaId: id });
  const { goalId } = props;
  const { data, loading } = useQuery<{ getGoal: GoalWithDetails }>(GET_GOAL, {
    variables: { id: goalId },
  });

  const onCreateNew = (successCriteriaType: SuccessCriteriaType) => {
    if (successCriteriaType === 'measurement') {
      setScreen('new-measure');
    } else if (successCriteriaType === 'action') {
      setScreen('new-action');
    }
  };

  const onClose = () => {
    setScreen('tabs');
    setSelectedSuccessCriteria(undefined);
    props.onClose();
  };

  const onBack = () => {
    setScreen('tabs');
  };

  return (
    <Drawer
      placement={'right'}
      onClose={onClose}
      isOpen={!!goalId}
      size={'lg'}
      trapFocus={false}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />

      {(() => {
        if (!goalId) {
          return null;
        } else if (loading) {
          return <Loader />;
        } else if (!data) {
          return <div>Something went wrong</div>;
        } else {
          return (
            <DrawerContent>
              {(() => {
                if (typeof selectedSuccessCriteria !== 'undefined') {
                  return (
                    <SuccessCriteriaDetail
                      onClose={onClose}
                      goal={data!.getGoal}
                      successCriteriaId={selectedSuccessCriteria}
                      onBack={() => setSelectedSuccessCriteria(undefined)}
                    />
                  );
                } else if (screen === 'tabs') {
                  return (
                    <>
                      <DrawerHeader>
                        <HStack>
                          <Icon as={AppIcons['goal']} />
                          <Header showBackButton={false} onClose={onClose}>
                            <HStack spacing={4}>
                              <EditableGoalName
                                title={data!.getGoal?.title}
                                editable={editGoalName}
                                id={goalId}
                                onFinishEdit={() => setEditGoalName(false)}
                              />
                              <HStack
                                spacing={0}
                                color={'gray.300'}
                                _hover={{ color: 'gray.500' }}
                              >
                                {!editGoalName && (
                                  <Button
                                    p={2}
                                    variant="ghost"
                                    _hover={{ bg: 'brand.50' }}
                                    size={'xs'}
                                    onClick={() => setEditGoalName(true)}
                                  >
                                    <EditIcon boxSize={3} />
                                  </Button>
                                )}
                                <Button
                                  p={2}
                                  variant="ghost"
                                  _hover={{ bg: 'brand.50' }}
                                  size={'xs'}
                                  onClick={onOpen}
                                >
                                  <DeleteIcon boxSize={3} />
                                </Button>
                                <DeleteGoalDialog
                                  isOpen={isOpen}
                                  onClose={onAlertClose}
                                  id={goalId}
                                />
                              </HStack>
                            </HStack>
                          </Header>
                        </HStack>
                      </DrawerHeader>
                      <DrawerBody>
                        {screen === 'tabs' && (
                          <Tabs
                            goal={data!.getGoal}
                            onCreateNew={onCreateNew}
                            onSuccessCriteriaSelect={(id: string) =>
                              setSelectedSuccessCriteria(id)
                            }
                          />
                        )}
                      </DrawerBody>
                    </>
                  );
                } else if (screen === 'new-action') {
                  return (
                    <NewAction
                      goal={data!.getGoal}
                      onClose={onClose}
                      onBack={onBack}
                    />
                  );
                } else if (screen === 'new-measure') {
                  return (
                    <NewMeasurement
                      goal={data!.getGoal}
                      onClose={onClose}
                      onBack={onBack}
                    />
                  );
                } else {
                  return null;
                }
              })()}
            </DrawerContent>
          );
        }
      })()}
    </Drawer>
  );
};

export default GoalDrawer;
