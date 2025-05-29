import { useState } from "react";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useInvoicesStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));
  const [totalAmount, setTotalAmount] = useState(1121000); // 合計売上
  const [acceptedCount, setAcceptedCount] = useState(10); // 入社人数
  const [generalCount, setGeneralCount] = useState(7); // 総合職
  const [technicalCount, setTechnicalCount] = useState(3); // 技術職

  // @todo 請求一覧情報を取得
  const loading = false;

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
