import { gql } from '@apollo/client';
import { GOAL_FRAGMENT } from '../fragments/Plan';

// Define mutation
export const CREATE_PLAN_MUTATION = gql`
  mutation CreatePlan($name: String!) {
    createPlan(name: $name) {
      plan {
        id
        name
        uuid
      }
    }
  }
`;

// Define mutation
export const CREATE_GOAL_MUTATION = gql`
  ${GOAL_FRAGMENT}
  mutation CreateGoal(
    $title: String!
    $planUuid: String!
    $expiresOn: String!
  ) {
    createGoal(title: $title, planUuid: $planUuid, expiresOn: $expiresOn) {
      goal {
        ...GoalCommonFields
      }
    }
  }
`;

export const CREATE_ACTION_MUTATION = gql`
  mutation CreateAction(
    $planUuid: String!
    $goalId: String!
    $name: String!
    $description: String!
    $startDate: String!
    $endDate: String!
    $trackingSettings: ActionTrackingInput!
  ) {
    createAction(
      planUuid: $planUuid
      goalId: $goalId
      name: $name
      description: $description
      startDate: $startDate
      endDate: $endDate
      trackingSettings: $trackingSettings
    ) {
      action {
        id
      }
    }
  }
`;
