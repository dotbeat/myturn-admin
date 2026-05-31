import { gql } from "@apollo/client";

export const UPDATE_OLD_PICK_JOBS = gql`
  mutation UpdateOldPickJobs($input: UpdateOldPickJobsInput!) {
    updateOldPickJobs(input: $input) {
      __typename
    }
  }
`;
