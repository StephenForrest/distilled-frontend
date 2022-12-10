import { gql } from '@apollo/client';
import { SUCCESS_CRITERIA_FRAGMENT } from 'app/lib/fragments/Plan';

export const CREATE_SUCCESS_CRITERIA = gql`
  ${SUCCESS_CRITERIA_FRAGMENT}
  mutation CreateSuccessCriteria(
    $goalId: String!
    $successCriteriaType: String!
    $name: String!
    $description: String!
    $startDate: String!
    $endDate: String!
    $trackingSettings: ActionTrackingInput!
  ) {
    createSuccessCriteria(
      goalId: $goalId
      successCriteriaType: $successCriteriaType
      name: $name
      description: $description
      startDate: $startDate
      endDate: $endDate
      trackingSettings: $trackingSettings
    ) {
      successCriteria {
        ...SuccessCriteriaFields
      }
      errors
    }
  }
`;

export const UPDATE_SUCCESS_CRITERIA_MUTATION = gql`
  mutation UpdateSuccessCriteria(
    $planUuid: String!
    $goalId: String!
    $successCriteriaId: String!
    $name: String!
    $description: String!
    $startDate: String!
    $endDate: String!
    $trackingSettings: ActionTrackingInput!
  ) {
    updateSuccessCriteria(
      planUuid: $planUuid
      goalId: $goalId
      name: $name
      successCriteriaId: $successCriteriaId
      description: $description
      startDate: $startDate
      endDate: $endDate
      trackingSettings: $trackingSettings
    ) {
      successCriteria {
        id
      }
      errors
    }
  }
`;
