import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  GetCompanyInvoicesStatisticsQuery,
  GetCompanyInvoicesStatisticsQueryVariables,
} from "@/graphql-client";
import { GET_COMPANY_INVOICE_STATISTICS } from "@/server/graphql/invoice/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useInvoicesStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));

  // 請求一覧情報を取得
  const { data, previousData, loading } = useQuery<
    GetCompanyInvoicesStatisticsQuery,
    GetCompanyInvoicesStatisticsQueryVariables
  >(GET_COMPANY_INVOICE_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
  });
  // 再取得中も前回の結果を表示し続ける
  const statistics = (data ?? previousData)?.getCompanyInvoicesStatistics;

  // 再リクエストする
  const refetchStatistics = async (periodKey: PeriodKeys) => {
    setPeriod(getPeriod(periodKey));
  };

  return {
    totalAmount: statistics?.totalAmount ?? 0, // 合計売上
    acceptedCount: statistics?.acceptedCount ?? 0, // 入社人数
    generalCount: statistics?.generalCount ?? 0, // 総合職
    technicalCount: statistics?.technicalCount ?? 0, // 技術職
    loading,
    refetchStatistics,
  };
}
