import { gql } from "@apollo/client";

export const UPDATE_HOT_JOBS = gql`
  mutation UpdateHotJobs($input: UpdateHotJobsInput!) {
    updateHotJobs(input: $input) {
      jobId
    }
  }
`;
