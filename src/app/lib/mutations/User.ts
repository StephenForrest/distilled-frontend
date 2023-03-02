import { gql } from '@apollo/client';

// Define mutation
export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($firstName: String!, $lastName: String!) {
    updateUser(firstName: $firstName, lastName: $lastName) {
      user {
        firstName
        lastName
        email
      }
    }
  }
`;
export const CREATE_SLACK_CONNECT = gql`
  mutation createSlackConnect($email: String!, $channelName: String!) {
    createSlackConnect(email: $email, channelName: $channelName) {
      ok
    }
  }
`;
