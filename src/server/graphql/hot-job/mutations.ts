import { gql } from "@apollo/client";

// 指標ごとの重み設定を更新
export const UPDATE_HOT_JOB_SCORING_WEIGHTS = gql`
  mutation UpdateHotJobScoringWeights(
    $input: UpdateHotJobScoringWeightsInput!
  ) {
    updateHotJobScoringWeights(input: $input) {
      id
      indicator
      weight
      displayOrder
      updatedAt
    }
  }
`;

// 指標ごとの重み設定に基づいて人気求人ランキングを更新
export const RECALCULATE_HOT_JOBS = gql`
  mutation RecalculateHotJobs {
    recalculateHotJobs {
      updatedCount
    }
  }
`;
