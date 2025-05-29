import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COMPANY_INVOICE_STATISTICS } from "@/server/graphql/invoice/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useInvoicesStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));
  const [totalAmount, setTotalAmount] = useState(0); // 合計売上
  const [acceptedCount, setAcceptedCount] = useState(0); // 入社人数
  const [generalCount, setGeneralCount] = useState(0); // 総合職
  const [technicalCount, setTechnicalCount] = useState(0); // 技術職

  // 請求一覧情報を取得
  const { loading } = useQuery(GET_COMPANY_INVOICE_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setTotalAmount(result.getCompanyInvoicesStatistics.totalAmount);
      setAcceptedCount(result.getCompanyInvoicesStatistics.acceptedCount);
      setGeneralCount(result.getCompanyInvoicesStatistics.generalCount);
      setTechnicalCount(result.getCompanyInvoicesStatistics.technicalCount);
    },
  });

  // 再リクエストする
  const refetchStatistics = async (periodKey: PeriodKeys) => {
    setPeriod(getPeriod(periodKey));
  };

  return {
    totalAmount,
    acceptedCount,
    generalCount,
    technicalCount,
    loading,
    refetchStatistics,
  };
}
