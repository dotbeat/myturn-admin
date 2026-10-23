import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  GetUsersStatisticsQuery,
  GetUsersStatisticsQueryVariables,
} from "@/graphql-client";
import { GET_USERS_STATISTICS } from "@/server/graphql/user/queries";
import { getPeriod, PeriodKeys } from "@/utils/shared/date";

export function useUsersStatistics(initialPeriodKey: PeriodKeys) {
  const [period, setPeriod] = useState(getPeriod(initialPeriodKey));

  // 求職者一覧情報を取得
  const { data, previousData, loading } = useQuery<
    GetUsersStatisticsQuery,
    GetUsersStatisticsQueryVariables
  >(GET_USERS_STATISTICS, {
    variables: {
      input: {
        periodStart: period.start,
        periodEnd: period.end,
      },
    },
    fetchPolicy: "no-cache",
  });
  // 再取得中も前回の結果を表示し続ける
  const statistics = (data ?? previousData)?.getUsersStatistics;

  // 再リクエストする
  const refetchStatistics = async (periodKey: PeriodKeys) => {
    setPeriod(getPeriod(periodKey));
  };

  return {
    allUserCount: statistics?.totalCount ?? 0, // 合計登録者数
    applicantCount: statistics?.applicantCount ?? 0, // 応募者数
    acceptedCount: statistics?.acceptedCount ?? 0, // 採用者数
    leavedCount: statistics?.leavedCount ?? 0, // 退会者数
    loading,
    refetchStatistics,
  };
}
