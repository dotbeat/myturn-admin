import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ENTRIES_STATISTICS } from "@/server/graphql/entry/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useApplicantsStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));
  const [allApplicantCount, setAllApplicantCount] = useState(0); // 合計応募者数
  const [pendingCount, setPendingCount] = useState(0); // 新着応募
  const [reviewingCount, setReviewingCount] = useState(0); // レビュー中
  const [interviewCount, setInterviewCount] = useState(0); // 面談設定済
  const [offeredCount, setOfferedCount] = useState(0); // 内定
  const [acceptedCount, setAcceptedCount] = useState(0); // 入社決定
  const [rejectedCount, setRejectedCount] = useState(0); // 採用見送り
  const [loading, setLoading] = useState(true);

  // 応募者一覧情報を取得
  useQuery(GET_ENTRIES_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setAllApplicantCount(result.getEntriesStatistics.totalCount);
      setPendingCount(result.getEntriesStatistics.pendingCount);
      setReviewingCount(result.getEntriesStatistics.reviewingCount);
      setInterviewCount(result.getEntriesStatistics.interviewCount);
      setOfferedCount(result.getEntriesStatistics.offeredCount);
      setAcceptedCount(result.getEntriesStatistics.acceptedCount);
      setRejectedCount(result.getEntriesStatistics.rejectedCount);
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
    allApplicantCount,
    pendingCount,
    reviewingCount,
    interviewCount,
    offeredCount,
    acceptedCount,
    rejectedCount,
    loading,
    refetchStatistics,
  };
}
