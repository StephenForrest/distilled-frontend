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

export const DELETE_PLAN_MUTATION = gql`
  mutation DeletePlan($id: String!) {
    deletePlan(id: $id) {
      success
    }
  }
`;

export const UPDATE_PLAN_MUTATION = gql`
  mutation UpdatePlan($id: String!, $name: String!) {
    updatePlan(id: $id, name: $name) {
      plan {
        id
        name
        uuid
      }
    }
  }
`;

export const DELETE_GOAL_MUTATION = gql`
  mutation DeleteGoal($id: String!) {
    deleteGoal(id: $id) {
      success
    }
  }
`;

export const UPDATE_GOAL_MUTATION = gql`
  ${GOAL_FRAGMENT}
  mutation UpdateGoal($id: String!, $title: String!) {
    updateGoal(id: $id, title: $title) {
      goal {
        ...GoalCommonFields
      }
    }
  }
`;
