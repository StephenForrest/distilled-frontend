import { gql } from '@apollo/client';

export const UPDATE_CHECKLIST = gql`
  mutation UpdateChecklist($id: String!, $itemId: String!, $checked: Boolean!) {
    updateChecklist(id: $id, itemId: $itemId, checked: $checked) {
      checklist {
        id
        settings
      }
    }
  }
`;
