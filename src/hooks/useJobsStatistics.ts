import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  GetJobsStatisticsQuery,
  GetJobsStatisticsQueryVariables,
} from "@/graphql-client";
import { GET_JOBS_STATISTICS } from "@/server/graphql/job/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useJobsStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));

  // 求人一覧情報を取得
  const { data, previousData, loading } = useQuery<
    GetJobsStatisticsQuery,
    GetJobsStatisticsQueryVariables
  >(GET_JOBS_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
  });
  // 再取得中も前回の結果を表示し続ける
  const statistics = (data ?? previousData)?.getJobsStatistics;

  // 再リクエストする
  const refetchStatistics = async (periodKey: PeriodKeys) => {
    setPeriod(getPeriod(periodKey));
  };

  return {
    allJobCount: statistics?.totalCount ?? 0, // 合計求人数
    newPostedCount: statistics?.newPostedCount ?? 0, // 新規掲載数
    activeCount: statistics?.activeCount ?? 0, // 募集中求人数
    closedCount: statistics?.closedCount ?? 0, // 掲載終了数
    loading,
    refetchStatistics,
  };
}
