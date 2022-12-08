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
    createdAt
    completion
  }
`;

export const SUCCESS_CRITERIA_FRAGMENT = gql`
  fragment SuccessCriteriaFields on SuccessCriteria {
    id
    name
    description
    startDate
    endDate
    goalId
    owner {
      name
    }
    completion
    successCriteriaType
    action {
      id
      trackingType
      tracking {
        __typename
        ... on Checklist {
          id
          settings
        }
      }
    }
  }
`;

export const GOAL_DETAILS_FRAGMENT = gql`
  ${SUCCESS_CRITERIA_FRAGMENT}
  fragment GoalDetails on Goal {
    id
    title
    expiresOn
    createdAt
    owner {
      name
    }
    completion
    measurementsCount
    actionsCount
    successCriterias {
      ...SuccessCriteriaFields
    }
  }
`;
