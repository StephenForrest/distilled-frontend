import { gql } from '@apollo/client';

export const UPDATE_CHECKLIST = gql`
  mutation UpdateChecklist($id: String!, $itemId: String!, $checked: Boolean!) {
    updateChecklist(id: $id, itemId: $itemId, checked: $checked) {
      goal {
        id
        completion
        successCriterias {
          completion
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
      }
    }
  }
`;
