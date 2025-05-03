import { gql } from "@apollo/client";

export const GET_MAGAZINE = gql`
  query GetMagazine {
    magazines {
      id
      title
      description
      category
      thumbnailUrl
      articleUrl
    }
  }
`;
