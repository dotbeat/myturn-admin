import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  GetEntriesStatisticsQuery,
  GetEntriesStatisticsQueryVariables,
} from "@/graphql-client";
import { GET_ENTRIES_STATISTICS } from "@/server/graphql/entry/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useApplicantsStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));

  // 応募者一覧情報を取得
  const { data, previousData, loading } = useQuery<
    GetEntriesStatisticsQuery,
    GetEntriesStatisticsQueryVariables
  >(GET_ENTRIES_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
  });
  // 再取得中も前回の結果を表示し続ける
  const statistics = (data ?? previousData)?.getEntriesStatistics;

  // 再リクエストする
  const refetchStatistics = async (periodKey: PeriodKeys) => {
    setPeriod(getPeriod(periodKey));
  };

  return {
    allApplicantCount: statistics?.totalCount ?? 0, // 合計応募者数
    pendingCount: statistics?.pendingCount ?? 0, // 新着応募
    reviewingCount: statistics?.reviewingCount ?? 0, // レビュー中
    interviewCount: statistics?.interviewCount ?? 0, // 面談設定済
    secondInterviewScheduledCount:
      statistics?.secondInterviewScheduledCount || 0, // 二次面談設定済み
    offeredCount: statistics?.offeredCount ?? 0, // 内定
    acceptedCount: statistics?.acceptedCount ?? 0, // 入社決定
    rejectedCount: statistics?.rejectedCount ?? 0, // 採用見送り
    loading,
    refetchStatistics,
  };
}
