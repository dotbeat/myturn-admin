import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_JOBS_STATISTICS } from "@/server/graphql/job/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useJobsStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));
  const [allJobCount, setAllJobCount] = useState(0); // 合計求人数
  const [newPostedCount, setNewPostedCount] = useState(0); // 新規掲載数
  const [activeCount, setActiveCount] = useState(0); // 募集中求人数
  const [closedCount, setClosedCount] = useState(0); // 掲載終了数
  const [loading, setLoading] = useState(true);

  // 求人一覧情報を取得
  useQuery(GET_JOBS_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      console.log(result);
      setAllJobCount(result.getJobsStatistics.totalCount);
      setNewPostedCount(result.getJobsStatistics.newPostedCount);
      setActiveCount(result.getJobsStatistics.activeCount);
      setClosedCount(result.getJobsStatistics.closedCount);
      setLoading(false);
    },
    onError() {
      setLoading(false);
    },
  });

  // 再リクエストする
  const refetchStatistics = async (periodKey: PeriodKeys) => {
    setLoading(true);
    setPeriod(getPeriod(periodKey));
  };

  return {
    allJobCount,
    newPostedCount,
    activeCount,
    closedCount,
    loading,
    refetchStatistics,
  };
}
