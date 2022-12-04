import { gql } from '@apollo/client';
import { GOAL_FRAGMENT } from '../fragments/Plan';

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
  query getPlans {
    getPlans {
      id
      name
    }
  }
`;
