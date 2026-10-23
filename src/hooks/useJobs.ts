import { useQuery } from "@apollo/client/react";
import { JobFilterFormData } from "@/schemas/job/filter";
import { SEARCH_JOB } from "@/server/graphql/job/queries";
import { JobItem } from "@/types/job";

export function useJobs(input: JobFilterFormData, page: number, limit: number) {
  // 求職者一覧情報を取得
  const { data, previousData, loading, refetch } = useQuery<{
    searchJobsWithStats: {
      items: JobItem[];
      totalCount: number;
      totalPages: number;
    };
  }>(SEARCH_JOB, {
    variables: { input: { ...input, page, limit } },
    fetchPolicy: "no-cache",
  });
  // 再取得中も前回の結果を表示し続ける
  const result = (data ?? previousData)?.searchJobsWithStats;

  // 一覧を再取得して最新の状態に更新する
  const refetchJobs = async () => {
    await refetch();
  };

  return {
    jobs: result?.items ?? [],
    totalCount: result?.totalCount ?? 0, // 検索結果数(全ページ)
    totalPages: result?.totalPages ?? 0, // 一覧表のページ数
    loading,
    refetchJobs,
  };
}
