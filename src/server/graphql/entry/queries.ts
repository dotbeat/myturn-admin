import { gql } from "@apollo/client";

export const SEARCH_ENTRIES = gql`
  query SearchEntries($input: SearchEntriesInput!) {
    searchEntries(input: $input) {
      items {
        id
        jobId
        userId
        createdAt
        updatedAt
        status
        job {
          id
          title
          jobType
          industry
          company {
            id
            name
          }
        }
        user {
          id
          firstName
          lastName
          avatarUrl
        }
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

export const GET_ENTRIES_STATISTICS = gql`
  query GetEntriesStatistics($input: GetEntriesStatisticsInput!) {
    getEntriesStatistics(input: $input) {
      totalCount
      pendingCount
      reviewingCount
      interviewCount
      offeredCount
      acceptedCount
      rejectedCount
    }
  }
`;
