import { gql } from "@apollo/client";

export const GET_PICK_JOB_SCORING_WEIGHTS = gql`
  query GetPickJobScoringWeights {
    getPickJobScoringWeights {
      id
      indicator
      weight
      displayOrder
      updatedAt
    }
  }
`;

export const GET_JOBS_BY_PICK_LIST = gql`
  query GetJobsByPickList {
    getJobsByPickList {
      id
      title
    }
  }
`;
