import { gql } from '@apollo/client';

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
