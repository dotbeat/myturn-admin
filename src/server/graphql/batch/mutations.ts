import { gql } from "@apollo/client";

// 日次バッチ処理
export const BATCH_DAILY = gql`
  mutation BatchDaily {
    batchDaily
  }
`;
