import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ApplicantFilterFormData } from "@/schemas/applicant/filter";
import { SEARCH_ENTRIES } from "@/server/graphql/entry/queries";
import { ApplicantItem } from "@/types/applicant";

export function useApplicants(
  input: ApplicantFilterFormData,
  page: number,
  limit: number,
) {
  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)
  const [totalPages, setTotalPages] = useState(0); // 一覧表のページ数

  // 検索結果を一覧の状態へ反映
  const applyResult = (result?: { searchEntries?: SearchEntriesResult }) => {
    if (!result?.searchEntries) return;
    setTotalCount(result.searchEntries.totalCount);
    setApplicants(result.searchEntries.items);
    setTotalPages(result.searchEntries.totalPages);
  };

  // 応募者一覧情報を取得
  const { loading, refetch: refetchQuery } = useQuery(SEARCH_ENTRIES, {
    variables: { input: { ...input, page, limit } },
    fetchPolicy: "no-cache",
    onCompleted: applyResult,
  });

  // onCompletedはrefetch時に発火しないため、結果から直接一覧を再描画する
  const refetch = async () => {
    const { data } = await refetchQuery();
    applyResult(data);
  };

  return {
    applicants,
    totalCount,
    totalPages,
    loading,
    refetch,
  };
}

type SearchEntriesResult = {
  items: ApplicantItem[];
  totalCount: number;
  totalPages: number;
};
