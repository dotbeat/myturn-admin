import { gql } from "@apollo/client";

export const GET_HOT_JOB_SCORING_WEIGHTS = gql`
  query GetHotJobScoringWeights {
    getHotJobScoringWeights {
      id
      indicator
      weight
      displayOrder
      updatedAt
    }
  }
`;

export const GET_JOBS_BY_HOT_LIST = gql`
  query GetJobsByHotList {
    getJobsByHotList {
      id
      title
    }
  }
`;
