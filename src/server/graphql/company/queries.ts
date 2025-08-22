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
        deletedAt
        jobCount
        entryCount
        interviewCount
        offerCount
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

export const GET_COMPANIES_STATISTICS = gql`
  query GetCompaniesStatistics($input: GetCompaniesStatisticsInput!) {
    getCompaniesStatistics(input: $input) {
      totalCount
      postedCount
      acceptedCount
      leavedCount
    }
  }
`;
