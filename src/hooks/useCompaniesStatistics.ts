import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COMPANIES_STATISTICS } from "@/server/graphql/company/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useCompaniesStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));
  const [allCompanyCount, setAllCompanyCount] = useState(0); // 合計登録者数
  const [postedCount, setPostedCount] = useState(0); // 掲載社数
  const [acceptedCount, setAcceptedCount] = useState(0); // 採用社数
  const [leavedCount, setLeavedCount] = useState(0); // 退会社数

  // 企業一覧情報を取得
  const { loading } = useQuery(GET_COMPANIES_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setAllCompanyCount(result.getCompaniesStatistics.totalCount);
      setPostedCount(result.getCompaniesStatistics.postedCount);
      setAcceptedCount(result.getCompaniesStatistics.acceptedCount);
      setLeavedCount(result.getCompaniesStatistics.leavedCount);
    },
  });

  // 再リクエストする
  const refetchStatistics = async (periodKey: PeriodKeys) => {
    setPeriod(getPeriod(periodKey));
  };

  return {
    allCompanyCount,
    postedCount,
    acceptedCount,
    leavedCount,
    loading,
    refetchStatistics,
  };
}
