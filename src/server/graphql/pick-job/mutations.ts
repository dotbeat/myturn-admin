import { gql } from "@apollo/client";

export const UPDATE_PICK_JOBS = gql`
  mutation UpdatePickJobs($input: UpdatePickJobsInput!) {
    updatePickJobs(input: $input) {
      __typename
    }
  }
`;
