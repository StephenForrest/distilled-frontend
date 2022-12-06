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
    measurementsCount
    actionsCount
  }
`;

export const GOAL_DETAILS_FRAGMENT = gql`
  fragment GoalDetails on Goal {
    id
    title
    expiresOn
    createdAt
    owner {
      name
    }
    measurementsCount
    actionsCount
    successCriterias {
      id
      name
      description
      startDate
      endDate
      owner {
        name
      }
      action {
        id
        tracking {
          __typename
          ... on Checklist {
            id
            settings
          }
        }
      }
    }
  }
`;
