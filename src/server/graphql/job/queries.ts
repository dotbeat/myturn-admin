import { gql } from "@apollo/client";

export const SEARCH_JOB = gql`
  query searchJobsWithStats($input: SearchJobsWithStatsInput!) {
    searchJobsWithStats(input: $input) {
      items {
        id
        title
        status
        pv
        jobHeader
        prefecture
        jobType
        industry
        updatedAt
        companyName
        favoriteCount
        entryCount
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
