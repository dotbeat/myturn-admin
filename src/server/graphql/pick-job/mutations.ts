import { gql } from "@apollo/client";

// 指標ごとの重み設定を更新
export const UPDATE_PICK_JOB_SCORING_WEIGHTS = gql`
  mutation UpdatePickJobScoringWeights(
    $input: UpdatePickJobScoringWeightsInput!
  ) {
    updatePickJobScoringWeights(input: $input) {
      id
      indicator
      weight
      displayOrder
      updatedAt
    }
  }
`;

// 指標ごとの重み設定に基づいて注目の求人を更新
export const RECALCULATE_PICK_JOBS = gql`
  mutation RecalculatePickJobs {
    recalculatePickJobs {
      updatedCount
    }
  }
`;
