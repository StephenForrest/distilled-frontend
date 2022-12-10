import { gql } from '@apollo/client';

export const CREATE_MEASUREMENT_MUTATION = gql`
  mutation CreateMeasurement(
    $planUuid: String!
    $goalId: String!
    $name: String!
    $description: String!
    $startDate: String!
    $endDate: String!
    $trackingSettings: ActionTrackingInput!
  ) {
    createMeasurement(
      planUuid: $planUuid
      goalId: $goalId
      name: $name
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
