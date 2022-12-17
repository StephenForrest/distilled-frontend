import { gql } from '@apollo/client';

// Define mutation
export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($name: String!) {
    updateUser(name: $name) {
      user {
        name
        email
      }
    }
  }
`;
