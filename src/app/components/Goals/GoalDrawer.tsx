import React, { useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Text,
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

export type Screens = 'tabs' | 'new-measure' | 'new-action' | 'action-detail';

const GoalDrawer = (props: {
  goalId: number | undefined;
  onClose: () => void;
}) => {
  const [screen, setScreen] = useState<Screens>('tabs');
  const [selectedSuccessCriteria, setSelectedSuccessCriteria] = useState<
    string | undefined
  >(undefined);
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
                        <Header showBackButton={false} onClose={onClose}>
                          <Text>{data?.getGoal?.title}</Text>
                        </Header>
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
