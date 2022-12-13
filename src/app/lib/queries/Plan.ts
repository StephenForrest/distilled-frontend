import { gql } from '@apollo/client';
import {
  GOAL_FRAGMENT,
  GOAL_DETAILS_FRAGMENT,
  SUCCESS_CRITERIA_FRAGMENT,
} from '../fragments/Plan';

export const GET_PLAN = gql`
  ${GOAL_FRAGMENT}
  query getPlan($uuid: String!) {
    getPlan(uuid: $uuid) {
      id
      name
      goals {
        ...GoalCommonFields
      }
    }
  }
`;

export const GET_PLANS = gql`
  ${GOAL_FRAGMENT}

  query getPlans {
    getPlans {
      id
      name
      recentGoals {
        ...GoalCommonFields
      }
      goalsCount
    }
  }
`;

export const GET_GOAL = gql`
  ${GOAL_DETAILS_FRAGMENT}
  query getGoal($id: String!) {
    getGoal(id: $id) {
      ...GoalDetails
    }
  }
`;

// cache-only
export const GET_SUCCESS_CRITERIA = gql`
  ${SUCCESS_CRITERIA_FRAGMENT}
  query getSuccessCritera($id: String!) {
    ...SuccessCriteriaFields
  }
`;
