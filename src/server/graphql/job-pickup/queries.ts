import { gql } from "@apollo/client";

export const GET_JOB_PICKUP_PERIODS = gql`
  query GetJobPickupPeriods($input: GetJobPickupPeriodsInput!) {
    jobPickupPeriods(input: $input) {
      items {
        id
        jobId
        jobTitle
        startAt
        endAt
        amount
        searchHitCount
        pvCount
        entryCount
        companyName
        jobType
        industry
      }
      totalCount
      totalPages
    }
  }
`;
