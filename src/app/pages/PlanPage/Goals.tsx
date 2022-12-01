import React from 'react';
import type { Goal } from 'types';

const Goals = (props: { goals: Goal[] }) => {
  return (
    <>
      {props.goals.map(goal => {
        return <div>{goal.id}</div>;
      })}
    </>
  );
};

export default Goals;
