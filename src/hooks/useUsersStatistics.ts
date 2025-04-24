import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_STATISTICS } from "@/server/graphql/user/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useUsersStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));
  const [allUserCount, setAllUserCount] = useState(0); // 合計登録者数
  const [applicantCount, setApplicantCount] = useState(0); // 応募者数
  const [acceptedCount, setAcceptedCount] = useState(0); // 採用者数
  const [leavedCount, setLeavedCount] = useState(0); // 退会者数

  // 求職者一覧情報を取得
  const { loading } = useQuery(GET_USERS_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setAllUserCount(result.getUsersStatistics.totalCount);
      setApplicantCount(result.getUsersStatistics.applicantCount);
      setAcceptedCount(result.getUsersStatistics.acceptedCount);
      setLeavedCount(result.getUsersStatistics.leavedCount);
    },
  });

  // 再リクエストする
  const refetchStatistics = async (periodKey: PeriodKeys) => {
    setPeriod(getPeriod(periodKey));
  };

  return {
    allUserCount,
    applicantCount,
    acceptedCount,
    leavedCount,
    loading,
    refetchStatistics,
  };
}
