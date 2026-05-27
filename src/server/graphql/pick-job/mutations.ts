import { gql } from "@apollo/client";

// 旧: 手動でjobIdを指定（緊急時用として残す）
export const UPDATE_PICK_JOBS = gql`
  mutation UpdatePickJobs($input: UpdatePickJobsInput!) {
    updatePickJobs(input: $input) {
      __typename
    }
  }
`;

// 新: 指標ごとの重み設定を更新
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

// Lambda から呼び出す再計算（管理画面の「今すぐ再計算」ボタン用）
export const RECALCULATE_PICK_JOBS = gql`
  mutation RecalculatePickJobs {
    recalculatePickJobs {
      updatedCount
    }
  }
`;
