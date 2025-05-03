import { gql } from "@apollo/client";

export const UPDATE_MAGAZINE = gql`
  mutation UpdateMagazine($input: UpdateMagazinesInput!) {
    updateMagazines(input: $input) {
      id
      title
      description
      category
      thumbnailUrl
      articleUrl
    }
  }
`;
