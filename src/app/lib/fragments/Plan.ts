import { gql } from '@apollo/client';

export const GOAL_FRAGMENT = gql`
  fragment GoalCommonFields on Goal {
    id
    title
    expiresOn
    createdAt
    owner {
      name
    }
  }
`;
