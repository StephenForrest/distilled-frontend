import React, { useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GoalWithDetails, SuccessCriteriaType } from 'types';
import { GET_GOAL } from 'app/lib/queries/Plan';
import Tabs from './Tabs';
import NewAction from './NewAction';

export type Screens = 'tabs' | 'new-measure' | 'new-action';

const GoalDrawer = (props: {
  goalId: number | undefined;
  onClose: () => void;
}) => {
  const [screen, setScreen] = useState<Screens>('tabs');
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
          return <div>Loading...</div>;
        } else if (!data) {
          return <div>Something went wrong</div>;
        } else {
          return (
            <DrawerContent>
              {(() => {
                if (screen === 'tabs') {
                  return (
                    <>
                      <DrawerHeader>{data?.getGoal?.title}</DrawerHeader>
                      <DrawerBody>
                        {screen === 'tabs' && (
                          <Tabs
                            goal={data!.getGoal}
                            onCreateNew={onCreateNew}
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
