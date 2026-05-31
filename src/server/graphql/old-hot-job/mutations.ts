import { gql } from "@apollo/client";

export const UPDATE_OLD_HOT_JOBS = gql`
  mutation UpdateOldHotJobs($input: UpdateOldHotJobsInput!) {
    updateOldHotJobs(input: $input) {
      __typename
    }
  }
`;
