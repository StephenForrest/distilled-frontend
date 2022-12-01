import { gql } from '@apollo/client';

export const GET_PLAN = gql`
  query getPlan($uuid: String!) {
    getPlan(uuid: $uuid) {
      id
      name
    }
  }
`;
