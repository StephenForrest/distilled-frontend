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
