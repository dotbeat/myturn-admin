import { gql } from "@apollo/client";

export const SEARCH_COMPANY = gql`
  query getCompanies($input: GetCompaniesInput!) {
    getCompanies(input: $input) {
      items {
        id
        name
        industry
        iconImageUrl
        prefecture
        createdAt
        jobCount
        acceptCount
      }
      limit
      page
      totalCount
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;
