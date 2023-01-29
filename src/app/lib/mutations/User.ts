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
export const CREATE_SLACK_CONNECT = gql`
  mutation createSlackConnect($email: String!, $channelName: String!) {
    createSlackConnect(email: $email, channelName: $channelName) {
      ok
    }
  }
`;
