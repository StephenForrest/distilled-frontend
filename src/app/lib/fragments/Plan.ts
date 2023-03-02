import { gql } from '@apollo/client';

export const GOAL_FRAGMENT = gql`
  fragment GoalCommonFields on Goal {
    id
    title
    expiresOn
    createdAt
    owner {
      firstName
      lastName
      profilePic
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
    createdAt
    owner {
      firstName
      lastName
      profilePic
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
        ... on Milestone {
          id
          settings
        }
      }
    }

    measurement {
      id
      trackingType
      tracking {
        __typename
        ... on MeasurementSlack {
          id
          integrationId
          metric
          value
          channelFilters {
            id
            name
            slackChannelId
          }
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
      firstName
      lastName
      profilePic
    }
    completion
    measurementsCount
    actionsCount
    successCriterias {
      ...SuccessCriteriaFields
    }
  }
`;
