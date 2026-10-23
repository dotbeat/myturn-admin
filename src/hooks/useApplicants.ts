import { useQuery } from "@apollo/client/react";
import { ApplicantFilterFormData } from "@/schemas/applicant/filter";
import { SEARCH_ENTRIES } from "@/server/graphql/entry/queries";
import { ApplicantItem } from "@/types/applicant";

export function useApplicants(
  input: ApplicantFilterFormData,
  page: number,
  limit: number,
) {
  // 応募者一覧情報を取得
  const {
    data,
    previousData,
    loading,
    refetch: refetchQuery,
  } = useQuery<{ searchEntries?: SearchEntriesResult }>(SEARCH_ENTRIES, {
    variables: { input: { ...input, page, limit } },
    fetchPolicy: "no-cache",
  });
  // 再取得中も前回の結果を表示し続ける
  const result = (data ?? previousData)?.searchEntries;

  const refetch = async () => {
    await refetchQuery();
  };

  return {
    applicants: result?.items ?? [],
    totalCount: result?.totalCount ?? 0, // 検索結果数(全ページ)
    totalPages: result?.totalPages ?? 0, // 一覧表のページ数
    loading,
    refetch,
  };
}

type SearchEntriesResult = {
  items: ApplicantItem[];
  totalCount: number;
  totalPages: number;
};
