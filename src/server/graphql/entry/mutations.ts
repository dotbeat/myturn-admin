import { gql } from "@apollo/client";

// 応募情報を更新
export const UPDATE_ENTRY = gql`
  mutation UpdateEntry($input: UpdateEntryInput!) {
    updateEntry(input: $input) {
      id
      status
      updatedAt
    }
  }
`;
