import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  GetCompaniesStatisticsQuery,
  GetCompaniesStatisticsQueryVariables,
} from "@/graphql-client";
import { GET_COMPANIES_STATISTICS } from "@/server/graphql/company/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useCompaniesStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));

  // 企業一覧情報を取得
  const { data, previousData, loading } = useQuery<
    GetCompaniesStatisticsQuery,
    GetCompaniesStatisticsQueryVariables
  >(GET_COMPANIES_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
  });
  // 再取得中も前回の結果を表示し続ける
  const statistics = (data ?? previousData)?.getCompaniesStatistics;

  // 再リクエストする
  const refetchStatistics = async (periodKey: PeriodKeys) => {
    setPeriod(getPeriod(periodKey));
  };

  return {
    allCompanyCount: statistics?.totalCount ?? 0, // 合計登録者数
    postedCount: statistics?.postedCount ?? 0, // 掲載社数
    acceptedCount: statistics?.acceptedCount ?? 0, // 採用社数
    leavedCount: statistics?.leavedCount ?? 0, // 退会社数
    loading,
    refetchStatistics,
  };
}
