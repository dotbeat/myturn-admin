import { gql } from "@apollo/client";

export const SEARCH_JOB = gql`
  query searchJobsWithStats($input: SearchJobsWithStatsInput!) {
    searchJobsWithStats(input: $input) {
      items {
        id
        title
        status
        openedAt
        pv
        jobHeader
        prefecture
        jobType
        industry
        deletedAt
        companyName
        companyDeletedAt
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

export const GET_JOBS_STATISTICS = gql`
  query GetJobsStatistics($input: GetJobsStatisticsInput!) {
    getJobsStatistics(input: $input) {
      totalCount
      newPostedCount
      activeCount
      closedCount
    }
  }
`;

export const GET_JOBS_BY_HOT_LIST = gql`
  query GetJobsByHotList {
    getJobsByHotList {
      id
    }
  }
`;
