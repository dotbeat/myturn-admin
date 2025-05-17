import { useState } from "react";
import { useQuery } from "@apollo/client";
import { JobFilterFormData } from "@/schemas/job/filter";
import { SEARCH_JOB } from "@/server/graphql/job/queries";
import { JobItem } from "@/types/job";
import { isSameObject } from "@/utils/shared/object";

export function useJobs(
  initialInput: JobFilterFormData,
  page: number,
  limit: number,
) {
  const [input, setInput] = useState(initialInput);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)
  const [totalPages, setTotalPages] = useState(0); // 一覧表のページ数

  // 求職者一覧情報を取得
  const { loading } = useQuery(SEARCH_JOB, {
    variables: { input: { ...input, page, limit } },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setJobs(result.searchJobsWithStats.items);
      setTotalCount(result.searchJobsWithStats.totalCount);
      setTotalPages(result.searchJobsWithStats.totalPages);
    },
  });

  // 再リクエストする
  const refetchJobs = async (newInput: JobFilterFormData) => {
    if (!isSameObject(input, newInput)) {
      setJobs([]);
      setInput(newInput);
    }
  };

  return {
    jobs,
    totalCount,
    totalPages,
    loading,
    refetchJobs,
  };
}
